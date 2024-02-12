import { ErrorResponse, SuccessResponse } from "../utility/response";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { UserRepository } from "../repository/userRepository";
import { autoInjectable } from "tsyringe";
import { plainToClass } from "class-transformer";
import { SignupInput } from "./../models/dto/SignupInput";
import { AppValidationError } from "../utility/errors";
import { GetSalt, GetToken, VerifyToken } from "./../utility/password";
import { GetHashedPassword } from "./../utility/password";
import { ValidatePassword } from "./../utility/password";
import { LoginInput } from "./../models/dto/LoginInput";
import { GenerateAccessCode, SendVerificationCode } from "../utility/notification";
import { VerificationInput } from "./../models/dto/UpdateInput";
import { TimeDifference } from "../utility/dataHelper";
import { ProfileInput } from "./../models/dto/AddressInput";
import { CartRepository } from "../repository/cartRepository";
import { CartInput } from "../models/dto/cartInput";
import { CartItemModel } from "app/models/CartItemsModel";
import { PullData } from "app/message-queue";

@autoInjectable()
export class CartService {
  repository: CartRepository;
  constructor(repository: CartRepository) {
    this.repository = repository;
  }

  async ResponseWithError(event: APIGatewayProxyEventV2) {
    return ErrorResponse(404, "requested method is not supported");
  }



  // cart section
  async CreateCart(event: APIGatewayProxyEventV2) {
 
    try {
        const token = event.headers.authorization;
        const payload = await VerifyToken(token);
        if(!payload) return ErrorResponse(403, "authorization failed");

        const input = plainToClass(CartInput, event.body);
        const error = await AppValidationError(input);
        if(error) return ErrorResponse(404, error);

        let currentCart = await this.repository.findShoppingCart(payload.user_id);

        if(!currentCart){
          currentCart = await this.repository.createShoppingCart(payload.user_id);
        }
        
        // find the item if exist
        let currentProduct = await this. repository.findCartItemByProductId(input.productId);

        
        if(currentProduct){
          // if exist update the qty
          await this.repository.updateCartItemByProductId(input.productId, (currentProduct.item_qty += input.qty))
        }
        else {
          // if does not call Product service to get product information
          const {data, status} = await PullData({
            action: "PULL_PRODUCT_DATA",
            productId: input.productId
          });
          console.log("Getting Product", data);

          if(status !== 200) {
            return ErrorResponse(500, "failed to add to cart!")
          }

          let cartItem = data.data as CartItemModel;
          if(currentCart) {
            cartItem.cart_id = currentCart.cart_id;
            cartItem.item_qty = input.qty;
             // finally create cart item
            await this.repository.createCartItem(cartItem);
          }
         return ErrorResponse(500, "failed to add to cart !");
        }

        // return all cart items to client
        return SuccessResponse({message: "profile updated"});
    } catch (error) {
        return ErrorResponse(500, error);
    }
  }


  async GetCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from get Cart" });
  }
  async UpdateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from update cart" });
  }
  async DeleteCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from delete cart" });
  }
}

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

        const input = plainToClass(ProfileInput, event.body);
        const error = await AppValidationError(input);
        if(error) return ErrorResponse(404, error);

        return SuccessResponse({message: "profile updated"});
    } catch (error) {
        return ErrorResponse(500, error);
    }

    return SuccessResponse({ message: "response from create Cart" });
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

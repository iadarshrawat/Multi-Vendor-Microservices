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

@autoInjectable()
export class UserService {
  repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async ResponseWithError(event: APIGatewayProxyEventV2) {
    return ErrorResponse(404, "requested method is not supported");
  }


  // user creation, validation & login
  async CreateUser(event: APIGatewayProxyEventV2) {

    try {
      const input = plainToClass(SignupInput, JSON.parse(event.body));
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(404, error);

      const salt = await GetSalt();
      const hashedPassword = await GetHashedPassword(input.password, salt);

      const data = await this.repository.createAccount({
        email: input.email,
        password: hashedPassword,
        phone: input.phone,
        userType: "BUYER",
        salt: salt,
      });
      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async LoginUser(event: APIGatewayProxyEventV2) {
    try {
        const input = plainToClass(LoginInput, JSON.parse(event.body));
        const error = await AppValidationError(input);
        if (error) return ErrorResponse(404, error);

        const data = await this.repository.findAccount( input.email );
        // check or validate the password
        const verified = await ValidatePassword(input.password, data.password, data.salt);

        if(!verified) {
            throw new Error("password does not match"); 
        }

        const token = GetToken(data);

        return SuccessResponse({token}); 

      } catch (error) {
        console.log(error);
        return ErrorResponse(500, error);
      }
  }


  async GetVerificationToken(event: APIGatewayProxyEventV2) {

    const token = event.headers.authorization;
    const payload = await VerifyToken(token);
    if(!payload) return ErrorResponse(403, "authorization failed!");

    const {code, expiry} = GenerateAccessCode();
    // save on DB to confirm verification
    await this.repository.updateVerificationCode(payload.user_id, code, expiry);
    // const response = await SendVerificationCode(code, payload.phone)
    return SuccessResponse({ message: "response code is send to your registered mobile number" });
  }


  async VerifyUser(event: APIGatewayProxyEventV2) {

    const token = event.headers.authorization;
    
    const payload = await VerifyToken(token);
    if(!payload) return ErrorResponse(403, "authorization failed!");

    const input = plainToClass(VerificationInput, JSON.parse(event.body));
    const error = await AppValidationError(input);
    if(error) return ErrorResponse(404, error);

    const {verification_code, expiry} = await this.repository.findAccount(payload.email);

    // find the user account
    if(verification_code===parseInt(input.code)) {
      // check expiry
      const currentTime = new Date();
      const diff = TimeDifference(expiry, currentTime.toISOString(), "m")
      if(diff > 0) {
        console.log("verification successfully!");

        // update on DB
        await this.repository.updateVerifyUser(payload.user_id)
      } else {
        return ErrorResponse(403, "verification code is expired !");
      }
    }
    // check the code is same or not and time should within expiry

    return SuccessResponse({ message: "response from Verify user" });
  }


  // user Profile
  async CreateProfile(event: APIGatewayProxyEventV2) {

    try {
      const token = event.headers.authorization;
    const payload = await VerifyToken(token);
    if(!payload) return ErrorResponse(403, "authorization falied"); 

    const input = plainToClass(ProfileInput, JSON.parse(event.body));
    const error = await AppValidationError(input);
    if(error) return ErrorResponse(404, error);

    const result = await this.repository.createProfile(payload.user_id, input);

    return SuccessResponse({ message: "Profile created" });
    } catch (error) {
      console.log(error);
        return ErrorResponse(500, error);
    }

  }

  async GetProfile(event: APIGatewayProxyEventV2) {
    try {
      const token = event.headers.authorization;
    const payload = await VerifyToken(token);
    if(!payload) return ErrorResponse(403, "authorization falied"); 

    const result = await this.repository.getUserProfile(payload.user_id);

    return SuccessResponse(result);
    } catch (error) {
      console.log(error)
      return ErrorResponse(500, error);
    }
  }



  async EditProfile(event: APIGatewayProxyEventV2) {

    try {
      const token = event.headers.authorization;
      const payload = await VerifyToken(token);
      if(!payload) return ErrorResponse(403, "authorization falied"); 

      const input = plainToClass(ProfileInput, JSON.parse(event.body));
      const error = await AppValidationError(input);
      if(error) return ErrorResponse(404, error);

      console.log('check 2')

      const result = await this.repository.editProfile(payload.user_id, input);
      return SuccessResponse({ message: "profile updated" });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
    
  }



  // cart section
  async CreateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from create Cart" });
  }
  async GetCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from get Cart" });
  }
  async UpdateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from update cart" });
  }

  // Payment Section
  async CreatePaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from Create payment method" });
  }
  async GetPaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from Get payment method" });
  }
  async UpdatePaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from Update payment method" });
  }
}

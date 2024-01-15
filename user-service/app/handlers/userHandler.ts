import { container } from "tsyringe";
import { APIGatewayProxyEventV2 } from "aws-lambda"
import { UserService } from "../service/userService";
import { ErrorResponse } from "../utility/response";
import middy from "middy";
import jsonBodyParser from "@middy/http-json-body-parser";


const service = container.resolve(UserService);

export const Signup = middy ((event: APIGatewayProxyEventV2)=>{
    return service.CreateUser(event);
})


export const Login = middy ((event: APIGatewayProxyEventV2)=>{
    return service.LoginUser(event);
})


export const Verify = middy ((event: APIGatewayProxyEventV2)=>{
    
    const httpMethod = event.requestContext.http.method.toLowerCase();

    console.log("hello")

    if(httpMethod === "get") {
        return service.GetVerificationToken(event);
    }
    else if(httpMethod === 'post') {
        return service.VerifyUser(event);
    }
    else {
        return service.ResponseWithError(event);
    }
})

export const Profile = middy ((event: APIGatewayProxyEventV2)=>{

    // post put get
    const httpMethod = event.requestContext.http.method.toLowerCase();

    console.log("check 1")

    if(httpMethod === "post") {
        return service.CreateProfile(event);
    }
    else if(httpMethod === 'put') {
        return service.EditProfile(event);
    }
    else if(httpMethod === "get") {
        return service.GetProfile(event);
    }
    else {
        return service.ResponseWithError(event);
    }
})

export const Cart = middy ((event: APIGatewayProxyEventV2)=>{

    // post put get
    const httpMethod = event.requestContext.http.method.toLowerCase();

    if(httpMethod === "post") {
        return service.CreateCart(event);
    }
    else if(httpMethod === 'put') {
        return service.UpdateCart(event);
    }
    else if(httpMethod === "get") {
        return service.GetCart(event);
    }
    else {
        return service.ResponseWithError(event);
    }
})

export const Payment = middy ((event: APIGatewayProxyEventV2)=>{
   // post put get
   const httpMethod = event.requestContext.http.method.toLowerCase();

   if(httpMethod === "post") {
       return service.CreatePaymentMethod(event);
   }
   else if(httpMethod === 'put') {
       return service.UpdatePaymentMethod(event);
   }
   else if(httpMethod === "get") {
       return service.GetPaymentMethod(event);
   }
   else {
    return service.ResponseWithError(event);
   }
})
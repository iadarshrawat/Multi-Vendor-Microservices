import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { ErrorResponse } from "./utility/response";
import { ProductService } from "./service/product-services";
import { ProductRepository } from "./repository/product-repository";
import "./utility"; // by doing this our utility things are called and specially our index.ts file will called and connect the DB
import middy from "@middy/core";

const service = new ProductService(new ProductRepository());

export const handler = middy(
  (
    event: APIGatewayEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> => {
    return service.handleQueueOperation(event);
  }
);

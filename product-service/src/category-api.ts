import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { ErrorResponse } from "./utility/response";
import "./utility"; // by doing this our utility things are called and specially our index.ts file will called and connect the DB
import { CategoryService } from "./service/category-services";
import { CategoryRepository } from "./repository/category-repository";
import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";

const service = new CategoryService(new CategoryRepository())

export const handler = middy ((event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const isRoot = event.pathParameters === null;

    console.log(event.httpMethod.toLocaleLowerCase, " ", isRoot);

    switch(event.httpMethod.toLowerCase()) {
        case "post":
            if(isRoot) {
                return service.createCategory(event);
            }
            break;
        case "get":
            return isRoot? service.getCategories(event) : service.getCategory(event);
        case "put":
            if(!isRoot) {
                return service.editCategory(event);
            }
        case "delete":
            if(!isRoot) {
                return service.deleteCategory(event);
            }
    }
    return service.ResponseWithError(event);
});
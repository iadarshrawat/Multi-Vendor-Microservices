import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { ErrorResponse } from "./utility/response";
import { ProductService } from "./service/product-services";
import { ProductRepository } from "./repository/product-repository";
import "./utility"; // by doing this our utility things are called and specially our index.ts file will called and connect the DB


const service = new ProductService(new ProductRepository())

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const isRoot = event.pathParameters === null;

    switch(event.httpMethod.toLowerCase()) {
        case "post":
            if(isRoot) {
                return service.createProuduct(event);
            }
            break;
        case "get":
            return isRoot? service.getProuducts(event) : service.getProuduct(event);
        case "put":
            if(!isRoot) {
                return service.editProuduct(event);
            }
        case "delete":
            if(!isRoot) {
                return service.deleteProuduct(event);
            }
    }
    return ErrorResponse(404, "requested method not allowed!");
}
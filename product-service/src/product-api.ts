import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { ErrorResponse } from "./utility/response";
import { ProductService } from "./service/product-services";
import { ProductRepository } from "./repository/product-repository";

const service = new ProductService(new ProductRepository())

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    const isRoot = event.pathParameters === null;

    // product
    // pathParameters : null

    // product/1234
    // pathParameters : {id: 1234}

    switch(event.httpMethod.toLowerCase()) {
        case "post":
            if(isRoot) {
                service.createProuduct();
            }
            break;
        case "get":
            return isRoot? service.getProuducts() : service.getProuduct();
        case "put":
            if(!isRoot) {
                return service.editProuduct();
            }
        case "delete":
            if(!isRoot) {
                return service.deleteProuduct();
            }
    }
    return ErrorResponse(404, "requested method not allowed!");
}
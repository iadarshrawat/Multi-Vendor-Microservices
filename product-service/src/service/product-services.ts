import { APIGatewayEvent } from "aws-lambda";
import { ProductRepository } from "../repository/product-repository";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { plainToClass } from "class-transformer";
import { ProductInput } from "../dto/product-input";
import { AppValidationError } from "../utility/errors";
import { products } from "../models/product-model";
import { CategoryRepository } from "../repository/category-repository";

export class ProductService {
    _repository: ProductRepository;
    constructor(repository: ProductRepository) {
        this._repository = repository;
    }

    async createProuduct(event: APIGatewayEvent) {

        const input = plainToClass(ProductInput, JSON.parse(event.body!));
        const error = await AppValidationError(input);
        if(error) return ErrorResponse(404, error);

        const data = await this._repository.createProduct(input);

        await new CategoryRepository().addItem({id: input.category_id, products: [data._id] });
        return SuccessResponse(data);
    }


    async getProuducts(event: APIGatewayEvent) {
        const data = await this._repository.getAllProduct();
        return SuccessResponse(data);
    }


    async getProuduct(event: APIGatewayEvent) {
        const proudctId = event.pathParameters?.id;
        if(!proudctId) return ErrorResponse(403, "please provide product id");
        const data =  await this._repository.getProductById(proudctId);
        return SuccessResponse(data);
    }


    async editProuduct(event: APIGatewayEvent) {
        const proudctId = event.pathParameters?.id;
        if(!proudctId) return ErrorResponse(403, "please provide product id");

        const input = plainToClass(ProductInput, JSON.parse(event.body!));
        const error = await AppValidationError(input);
        if(error) return ErrorResponse(404, error);

        input.id = proudctId;
        const data = await this._repository.updateProduct(input)
        return SuccessResponse(data);
    }
    async deleteProuduct(event: APIGatewayEvent) {
        const productId = event.pathParameters?.id;
        if(!productId) return ErrorResponse(403, "please provide product id");

        const {category_id, deleteResult} = await this._repository.deleteProduct(productId);
        await new CategoryRepository().removeItem({id: category_id, products: [productId] });

        return SuccessResponse(deleteResult);
    }
}
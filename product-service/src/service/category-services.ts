import { APIGatewayEvent } from "aws-lambda";
import { CategoryRepository } from "../repository/category-repository";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { plainToClass } from "class-transformer";
import { CategoryInput } from "../dto/category-input";
import { AppValidationError } from "../utility/errors";

export class CategoryService {
  _repository: CategoryRepository;
  constructor(repository: CategoryRepository) {
    this._repository = repository;
  }

  async ResponseWithError(event: APIGatewayEvent) {
    return ErrorResponse(404, new Error("method not allowed!"));
  }

  async createCategory(event: APIGatewayEvent) {
    const input = plainToClass(CategoryInput, JSON.parse(event.body!));
    const error = await AppValidationError(input);
    if (error) return ErrorResponse(404, error);
    const data = await this._repository.createCategory(input);
    return SuccessResponse(data);
  }

  async getCategories(event: APIGatewayEvent) {
    const type = event.queryStringParameters?.type; 
    if (type === "top") {
      console.log("with top")
      const data = await this._repository.getTopCategories();
      return SuccessResponse(data);
    }
    console.log("without top")
    const data = await this._repository.getAllCategories();
    return SuccessResponse(data);
  }

  async getCategory(event: APIGatewayEvent) {
    const categoryId = event.pathParameters?.id;
    const offset = Number(event.queryStringParameters?.offset)
    const perPage = Number(event.queryStringParameters?.perPage)
    if (!categoryId) return ErrorResponse(403, "please provide category id");
    const data = await this._repository.getCategoryById(categoryId, offset, perPage);
    return SuccessResponse(data);
  }

  async editCategory(event: APIGatewayEvent) {
    const categoryId = event.pathParameters?.id;
    if (!categoryId) return ErrorResponse(403, "please provide category id");

    const input = plainToClass(CategoryInput, JSON.parse(event.body!));
    const error = await AppValidationError(input);
    if (error) return ErrorResponse(404, error);

    input.id = categoryId;
    const data = await this._repository.updateCategory(input);
    return SuccessResponse(data);
  }

  async deleteCategory(event: APIGatewayEvent) {
    const categoryId = event.pathParameters?.id;
    if (!categoryId) return ErrorResponse(403, "please provide category id");

    await this._repository.deleteCategory(categoryId);
    return SuccessResponse({ msg: "delete Category" });
  }
}

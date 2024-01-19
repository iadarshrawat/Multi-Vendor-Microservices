import { ProductRepository } from "../repository/product-repository";
import { SuccessResponse } from "../utility/response";

export class ProductService {
    _repository: ProductRepository;
    constructor(repository: ProductRepository) {
        this._repository = repository;
    }

    async createProuduct() {
        return SuccessResponse({msg: "Product Created!"});
    }
    async getProuducts() {
        return SuccessResponse({msg: "get Products"});
    }
    async getProuduct() {
        return SuccessResponse({msg: "get product by id"});
    }
    async editProuduct() {
        return SuccessResponse({msg: "edit product"});
    }
    async deleteProuduct() {
        return SuccessResponse({msg: "delete prouduct"});
    }
}
import { CategoryInput } from "../dto/category-input";
import { CategoryDoc, categories } from "../models/category-model";

export class CategoryRepository {
    constructor() {}

    async createCategory({name, parentId}: CategoryInput) {
        // create a new Category
        const newCategory = await categories.create({
            name,
            parentId,
            subCategory: [],
            products:[],
        })
        // parent id exist
        // update parent category with the new sub category id
        if(parentId) {
            const parentCategory = await categories.findById(parentId) as CategoryDoc;
            parentCategory.subCategories = [
                ...parentCategory.subCategories,
                newCategory
            ]
            await parentCategory.save();
        }
        // return new create category
        return newCategory;
    }
}
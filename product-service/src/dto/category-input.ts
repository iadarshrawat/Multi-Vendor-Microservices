import { Length } from "class-validator";

export class CategoryInput {
    id: string;

    @Length(3, 128)
    name: string;

    parentId?: string;

    products: string[];

    displayOrder: number;

    imageUrl: string;
}
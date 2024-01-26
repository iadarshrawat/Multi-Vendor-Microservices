import mongoose from 'mongoose'

type CategoryModel = {
    name: string,
    description: string,
    category_id: string,
    image_url: string,
    price: number,
    availability: boolean,
}

export type CategoryDoc = mongoose.Document & CategoryModel;

const categorySchema = new mongoose.Schema({
    name: String,
    description: String,
    category_id: String,
    image_url: String,
    price: Number,
    availability: Boolean,
}, {
    toJSON: {
        transform(doc, ret, options) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
}
)

const categories = mongoose.models.categories || mongoose.model<CategoryDoc>("categories", categorySchema);

export {categories};

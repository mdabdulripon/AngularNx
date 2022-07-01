import { ICategory } from "./category";

export interface IProduct {
    id?: string;
    name?: string;
    description?: string;
    image?: string;
    images?: string[];
    brand?: string;
    price?: string;
    category?: ICategory;
    countInStock?: number; 
    rating?: number;
    newReviews?: number;
    isFeatured?: boolean;
    dateCreated?: string;
}

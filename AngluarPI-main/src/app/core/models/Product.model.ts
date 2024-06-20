import { Category } from "./Category.model";
import { Review } from "./Review.model";
import { ShoppingCart } from "./ShoppingCart.model";
import { SizeType } from "./SizeType.model";

export class Product {
    productId?: number;
    title!: string;
    description!: string;
    price!: number;
    size?: SizeType;
    quantity?: number;
    status!: string;
    discountPercentage?: number;
    discountPrice?: number;
    image!: string;
    shoppingCart?: ShoppingCart;
    category?: Category;
    reviews?: Review[];
  
    [key: string]: any;

    
}

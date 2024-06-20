import { Product } from "./Product.model";

export class Category {
    categoryId?: number;
    name!: string;
    description!: string;
    products?: Product[];
    [key: string]: any;
  }
  
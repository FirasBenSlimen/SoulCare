import { Orders } from "./Orders.model";
import { Product } from "./Product.model";

export class ShoppingCart {
    cartId: number;
    totalPrice: number;
    products: Product[]; // Assuming Product is another class/interface
    order: Orders; // Assuming Orders is another class/interface
  
    constructor(cartId: number, totalPrice: number, products: Product[], order: Orders) {
      this.cartId = cartId;
      this.totalPrice = totalPrice;
      this.products = products;
      this.order = order;
    }
  }
  
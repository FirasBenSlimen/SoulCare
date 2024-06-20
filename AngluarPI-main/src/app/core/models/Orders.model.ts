import { Delivery } from "./Delivery.model";
import { Product } from "./Product.model";
import { ShoppingCart } from "./ShoppingCart.model";

export class Orders {
    orderId: number;
    totalAmount: number;
    statusOrder: string;
    dateCreation: Date;
    shippingAddress: string;
    paymentStatus: string;
    shoppingCart: ShoppingCart; // Assuming ShoppingCart is another class/interface
    products: Product[]; // Assuming Product is another class/interface
    delivery: Delivery; // Assuming Delivery is another class/interface
  
    constructor(
      orderId: number,
      totalAmount: number,
      statusOrder: string,
      dateCreation: Date,
      shippingAddress: string,
      paymentStatus: string,
      shoppingCart: ShoppingCart,
      products: Product[],
      delivery: Delivery
    ) {
      this.orderId = orderId;
      this.totalAmount = totalAmount;
      this.statusOrder = statusOrder;
      this.dateCreation = dateCreation;
      this.shippingAddress = shippingAddress;
      this.paymentStatus = paymentStatus;
      this.shoppingCart = shoppingCart;
      this.products = products;
      this.delivery = delivery;
    }
  }
  
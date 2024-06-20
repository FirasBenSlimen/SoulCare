import { Orders } from "./Orders.model";
import { ShippingType } from "./ShippingType.model";

export class Delivery {
    deliveryId: number;
    deliveryStatus: string;
    deliveryForm: string;
    shippingType: ShippingType;
    trackingNumber: string;
    order: Orders; // Assuming Orders is another class/interface
  
    constructor(
      deliveryId: number,
      deliveryStatus: string,
      deliveryForm: string,
      shippingType: ShippingType,
      trackingNumber: string,
      order: Orders
    ) {
      this.deliveryId = deliveryId;
      this.deliveryStatus = deliveryStatus;
      this.deliveryForm = deliveryForm;
      this.shippingType = shippingType;
      this.trackingNumber = trackingNumber;
      this.order = order;
    }
  }
  
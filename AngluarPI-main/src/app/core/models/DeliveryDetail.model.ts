import { Delivery } from "./Delivery.model";

export class DeliveryDetail {
    deliveryDetailId: number;
    nomClient: string;
    zipCode: string;
    adresseLine: string;
    state: string;
    ville: string;
    delivery: Delivery; // Assuming Delivery is another class/interface
  
    constructor(
      deliveryDetailId: number,
      nomClient: string,
      zipCode: string,
      adresseLine: string,
      state: string,
      ville: string,
      delivery: Delivery
    ) {
      this.deliveryDetailId = deliveryDetailId;
      this.nomClient = nomClient;
      this.zipCode = zipCode;
      this.adresseLine = adresseLine;
      this.state = state;
      this.ville = ville;
      this.delivery = delivery;
    }
  }
  
import { Product } from "./Product.model";

export class Review {
    reviewId: number;
    productId: number;
    rating: number;
    comment: string;
    dateReview: Date;
    stat: number;
    product: Product; // Assuming Product is another class/interface
  
    constructor(
      reviewId: number,
      productId: number,
      rating: number,
      comment: string,
      dateReview: Date,
      stat: number,
      product: Product
    ) {
      this.reviewId = reviewId;
      this.productId = productId;
      this.rating = rating;
      this.comment = comment;
      this.dateReview = dateReview;
      this.stat = stat;
      this.product = product;
    }
  }
  
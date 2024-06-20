import { Component } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/Product.model';
import { SizeType } from 'src/app/core/models/SizeType.model';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  product: Product = new Product(); // Initialize an empty product object
  sizeOptions: SizeType[] = Object.values(SizeType); // Define size options

  constructor(private productService: ProductService) {}

  onSubmit() {
    // Assuming your ProductService has a method named `createProduct` for adding products
    this.productService.createProduct(this.product).subscribe(
      (createdProduct) => {
        console.log('New product created:', createdProduct);
        // Optionally, you can navigate to a different route or show a success message here
      },
      (error) => {
        console.error('Error creating product:', error);
        // Optionally, you can show an error message to the user
      }
    );
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    // Handle file upload logic here
  }
}

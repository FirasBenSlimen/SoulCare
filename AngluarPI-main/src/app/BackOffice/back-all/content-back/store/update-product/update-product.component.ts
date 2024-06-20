import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/Product.model';
import { SizeType } from 'src/app/core/models/SizeType.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  productId: number;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productId = 0; // Initialize to a default value if necessary
    this.product = new Product(); // Initialize to an empty product object if necessary
  }  sizeOptions: SizeType[] = Object.values(SizeType); // Define size options


  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('productId')!;
    this.getProductDetails();
  }

  getProductDetails() {
    this.productService.getProductById(this.productId).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (error) => {
        console.error('Error fetching product details:', error);
        // Optionally, handle the error gracefully (e.g., show error message to the user)
      }
    );
  }
  onUpdate() {
    this.productService.updateProduct(this.productId, this.product).subscribe(
      (updatedProduct: Product) => {
        console.log('Product updated successfully:', updatedProduct);
        // Optionally, navigate to a different route or show a success message
      },
      (error) => {
        console.error('Error updating product:', error);
        // Optionally, handle the error gracefully (e.g., show error message to the user)
      }
    );
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    // Handle file upload logic here
  }
}
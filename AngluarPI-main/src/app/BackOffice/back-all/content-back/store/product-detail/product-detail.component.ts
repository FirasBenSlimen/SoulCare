import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/Product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { Router } from '@angular/router'; // Import the Router module
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  productId: number;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { 
    this.productId = 0; // Initialize to a default value if necessary
    this.product = new Product(); // Initialize to an empty product object if necessary
  }

  ngOnInit(): void {
 
    this.productId = +this.route.snapshot.paramMap.get('productId')!;
    this.getProductDetails();
  }

  getProductDetails() {
    this.productService.getProductById(this.productId).subscribe(
      (product: Product) => {
        if (product) {
          this.product = product;
        } else {
          console.error('Product not found');
        }
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }
  
  
  getProductProperties(): { name: string, key: string }[] {
    return [
      { name: 'Size', key: 'size' },
      { name: 'Quantity', key: 'quantity' },
      { name: 'description', key: 'description' },
      { name: 'price', key: 'price' },
      { name: 'discountPercentage', key: 'discountPercentage' },
      { name: 'discountPrice', key: 'discountPrice' },
      { name: 'string', key: 'string' },
      { name: 'image', key: 'image' },

    ];
  }
  onUpdateProduct(productId: number | undefined) {
    if (productId !== undefined) {
      this.router.navigate(['/admin/products/update-product', productId]);
    } else {
      console.error('Product ID is undefined');
    }
  }
  onDeleteProduct(productId: number | undefined) {
    if (productId) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          console.log('Product deleted successfully');
          // Optionally, navigate to a different route after deletion
          this.router.navigate(['/admin/products']);
        },
        (error) => {
          console.error('Error deleting product:', error);
          // Optionally, show an error message to the user
        }
      );
    } else {
      console.error('Product ID is undefined');
    }
  }
  
}
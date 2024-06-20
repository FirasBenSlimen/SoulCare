import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/Product.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; // Initialize with an empty array

  constructor(private productService: ProductService) { }
/*
  ngOnInit(): void {
    //this.getProducts();
    this.productService.getProducts().subscribe( x => this.products= x );
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }
}*/
ngOnInit(): void {
  this.productService.getProducts().subscribe(products => {
    this.products = products;
  });
}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [ProductService]
})
export class ProductDetailsComponent implements OnInit {

  private product!: Product;

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductIdFromUrl();
  }

  private getProductIdFromUrl(): void {
    this.activatedRoute.params.subscribe(
      params => {
        const productId = params["productId"];
        this.productService.getProductWithId(productId).subscribe(
          product => this.product = product
        );
      }
    );
  }

  get getProduct(): Product {
    return this.product;
  }

  addToCart(product: Product): void {
    console.log("[ProductDetailsComponent.addToCart] method is called");
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  providers: [ProductService, CartService]
})
export class ProductDetailsComponent implements OnInit {

  private product!: Product;

  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private alertifyService: AlertifyService,
    private cartService: CartService) { }

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
    this.alertifyService.success(`${product.name} sepete eklendi.`);
    this.cartService.addProductToCart(product);
  }

}

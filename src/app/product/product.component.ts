import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from '../cart.service';
import { Product } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService, CartService]
})
export class ProductComponent implements OnInit {

  constructor(private alertifyService: AlertifyService, private productService: ProductService,
    private acivatedRoute: ActivatedRoute, private cartService: CartService) { }

  title = 'Urun Listesi';
  products!: Product[];
  filterText: string = '';

  addToCart(product: Product) {
    this.alertifyService.success(`${product.name} sepete eklendi.`);
    this.cartService.addProductToCart(product);
  }

  ngOnInit(): void {
    this.acivatedRoute.params.subscribe(params => {
      this.productService.getProducts(params["categoryId"]).subscribe(data => { this.products = data });
    });
  }

}

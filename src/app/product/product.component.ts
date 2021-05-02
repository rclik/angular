import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/services/alertify.service';
import { ProductService } from 'src/services/product.service';
import { Product } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  constructor(private alertifyService: AlertifyService, private productService: ProductService,
    private acivatedRoute: ActivatedRoute) { }

  title = 'Urun Listesi';
  products!: Product[];
  filterText: string = '';

  addToCart(product: Product) {
    this.alertifyService.success('Sepete eklemeye basildi. ' + product.name);
  }

  ngOnInit(): void {
    this.acivatedRoute.params.subscribe(params => {
      this.productService.getProducts(params["categoryId"]).subscribe(data => { this.products = data });
    });
  }

}

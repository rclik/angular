import { Component, OnInit } from '@angular/core';
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

  constructor(private alertifyService: AlertifyService, private productService: ProductService) { }

  title = 'Urun Listesi';
  products!: Product[];
  filterText: string = '';

  addToCart(product: Product) {
    this.alertifyService.success('Sepete eklemeye basildi. ' + product.name);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => { this.products = data });
  }

}

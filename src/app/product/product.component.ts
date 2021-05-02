import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/services/alertify.service';
import { Product } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private alertifyService: AlertifyService, private httpClient: HttpClient) { }

  title = 'Urun Listesi';
  products!: Product[];
  filterText: string = '';
  path: string = 'http://localhost:3000/products';

  addToCart(product: Product) {
    this.alertifyService.success('Sepete eklemeye basildi. ' + product.name);
  }

  ngOnInit(): void {
    this.httpClient.get<Product[]>(this.path).subscribe( data => {this.products = data} );
  }

}

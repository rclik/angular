import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/services/alertify.service';
import { Product } from './product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private alertifyService: AlertifyService) { }

  title = 'Urun Listesi';
  products: Product[] = [
    { id: 1, name: 'LapTop', price: 2500, categoryId: 1, description: 'Asus Zenbook', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60' },
    { id: 2, name: 'Mouse', price: 25, categoryId: 2, description: 'A4 Tech', imageUrl: 'https://images.unsplash.com/photo-1616071358846-9f34f471815d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW91c2VwYWR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60' },
    { id: 1, name: 'LapTop', price: 2500, categoryId: 1, description: 'Asus Zenbook', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60' },
    { id: 2, name: 'Mouse', price: 25, categoryId: 2, description: 'A4 Tech', imageUrl: 'https://images.unsplash.com/photo-1616071358846-9f34f471815d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW91c2VwYWR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60' },
    { id: 1, name: 'LapTop', price: 2500, categoryId: 1, description: 'Asus Zenbook', imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60' },
    { id: 2, name: 'Mouse', price: 25, categoryId: 2, description: 'A4 Tech', imageUrl: 'https://images.unsplash.com/photo-1616071358846-9f34f471815d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW91c2VwYWR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60' },
  ];
  filterText: string = '';

  addToCart(product: Product) {
    this.alertifyService.success('Sepete eklemeye basildi. ' + product.name);
  }

  ngOnInit(): void {
  }

}

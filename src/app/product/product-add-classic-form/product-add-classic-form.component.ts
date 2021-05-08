import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/category/category';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-add-classic-form',
  templateUrl: './product-add-classic-form.component.html',
  styleUrls: ['./product-add-classic-form.component.css'],
  providers: [CategoryService, ProductService]
})
export class ProductAddClassicFormComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private productService: ProductService, 
              private alertifyService: AlertifyService) { }

  model: Product = new Product();
  categories!: Category[];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  addProduct(form: NgForm) {
    // form.value form icindeki input larin inputName-value seklinde getirilmesini saglar.
    console.log("[addProduct] is added " + JSON.stringify(form.value));

    this.productService.addProduct(this.model).subscribe(data => console.log(data.name + " is added."))

    console.log("[ProductAddClassicFormComponent.addProduct] method is released ");
  }

}

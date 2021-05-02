import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/category/category';
import { CategoryService } from 'src/services/category.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-add-classic-form',
  templateUrl: './product-add-classic-form.component.html',
  styleUrls: ['./product-add-classic-form.component.css'],
  providers: [CategoryService]
})
export class ProductAddClassicFormComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  model: Product = new Product();
  categories!: Category[];

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  addProduct(form: NgForm) {
    // form.value form icindeki input larin inputName-value seklinde getirilmesini saglar.
    console.log(form.value);
  }

}

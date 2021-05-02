import { Component, OnInit } from '@angular/core';
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

  model!: Product;
  categories!: Category[];

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/category/category';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-add-reactive-form',
  templateUrl: './product-add-reactive-form.component.html',
  styleUrls: ['./product-add-reactive-form.component.css'],
  providers: [FormBuilder, CategoryService, ProductService]
})
export class ProductAddReactiveFormComponent implements OnInit {

  // bu object, html element element ini yonetmeyi, data larina ulasmayi saglar.
  productAddForm!: FormGroup;

  // form submit edildiginde formGroup object inden gelen degerler ile populate olacak object, sonrasinda service de kullanicak.
  product!: Product;

  categories!: Array<Category>;

  // formBuilder library, bu library i html template i ve class property lerini iliskilendirmek, html elemnt lerine ozellik eklemek icin kullanicagiz.
  constructor(private formBulder: FormBuilder, private categoryService: CategoryService,
    private productService: ProductService, private alertifyService: AlertifyService) { }

  createAddForm(): void {
    this.productAddForm = this.formBulder.group(
      {
        name: ["", [Validators.required]],
        description: ["", Validators.required],
        imageUrl: ["", Validators.required],
        price: ["", Validators.required],
        categoryId: ["", Validators.required],
      }
    );
  }

  ngOnInit(): void {
    console.debug("[ProductAddReactiveFormComponent.ngOnInit] is called");
    this.createAddForm();
    this.populateCategories();
  }

  private populateCategories() {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  add(): void {
    console.debug("[ProductAddReactiveFormComponent.add] method is called.");
    if (this.productAddForm.valid) {
      // product form unun class property sine assign etme sekli.
      this.product = Object.assign({}, this.productAddForm.value);
      console.debug("[ProductAddReactiveFormComponent.add] object: " + JSON.stringify(this.product));
      this.productService.addProduct(this.product).subscribe(data => this.alertifyService.success("Urun eklendi. " + data.name));

    } else {
      console.debug("[ProductAddReactiveFormComponent.add] Form is not valid");
    }
  }

  get getFormControl() {
    return this.productAddForm.controls;
  }

}

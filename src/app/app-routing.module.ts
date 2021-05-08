import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginClassicFormComponent } from './login/login-classic-form/login-classic-form.component';
import { LoginGuard } from './login/login.guard';
import { ProductAddClassicFormComponent } from './product/product-add-classic-form/product-add-classic-form.component';
import { ProductAddReactiveFormComponent } from './product/product-add-reactive-form/product-add-reactive-form.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: "products", component: ProductComponent },
  { path: "", redirectTo: "products", pathMatch: "full" },
  { path: "products/categories/:categoryId", component: ProductComponent },
  { path: "product-add-classic", component: ProductAddClassicFormComponent, canActivate: [LoginGuard] },
  { path: "product-add-reactive", component: ProductAddReactiveFormComponent },
  { path: "login", component: LoginClassicFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

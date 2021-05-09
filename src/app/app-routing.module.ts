import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginClassicFormComponent } from './login/login-classic-form/login-classic-form.component';
import { LoginReactiveFormComponent } from './login/login-reactive-form/login-reactive-form.component';
import { LoginGuard } from './login/login.guard';
import { ProductAddClassicFormComponent } from './product/product-add-classic-form/product-add-classic-form.component';
import { ProductAddReactiveFormComponent } from './product/product-add-reactive-form/product-add-reactive-form.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: "products", component: ProductComponent },
  { path: "", redirectTo: "products", pathMatch: "full" },
  { path: "products/categories/:categoryId", component: ProductComponent },
  { path: "product-add-classic", component: ProductAddClassicFormComponent, canActivate: [LoginGuard] },
  { path: "product-add-reactive", component: ProductAddReactiveFormComponent, canActivate: [LoginGuard] },
  { path: "login", component: LoginClassicFormComponent },
  { path: "loginReactive", component: LoginReactiveFormComponent },
  { path: "products/:productId", component: ProductDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { NavComponent } from './nav/nav.component';
import { CategoryComponent } from './category/category.component';
import { ProductFilterPipe } from './product/product-filter.pipe';
import { ProductAddClassicFormComponent } from './product/product-add-classic-form/product-add-classic-form.component';
import { ProductAddReactiveFormComponent } from './product/product-add-reactive-form/product-add-reactive-form.component';
import { AccountService } from './services/account.service';
import { LoginGuard } from './login/login.guard';
import { LoginClassicFormComponent } from './login/login-classic-form/login-classic-form.component';
import { LoginReactiveFormComponent } from './login/login-reactive-form/login-reactive-form.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NavComponent,
    CategoryComponent,
    ProductFilterPipe,
    ProductAddClassicFormComponent,
    ProductAddReactiveFormComponent,
    LoginClassicFormComponent,
    LoginClassicFormComponent,
    LoginReactiveFormComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AccountService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

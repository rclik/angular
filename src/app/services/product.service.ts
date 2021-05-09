import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { tap, catchError } from 'rxjs/operators';
import { Product } from 'src/app/product/product';

@Injectable()
export class ProductService {
  path: string = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) { }

  getProducts(categoryId?: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.getPath(categoryId)).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProductWithId(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(this.path + "/" + productId).pipe(
      tap(product => console.log("[ProductService.getProductWithId] returned product: " + JSON.stringify(product))),
      catchError(this.handleError)
    );
  }

  addProduct(product: Product): Observable<Product> {
    console.log("[ProductService.addProduct] method is called");

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "token"
    });

    // this object can be created on the function, but to be more clear
    const options = {
      headers: headers
    }

    return this.httpClient.post<Product>(this.path, product, options).pipe(
      tap(data => console.log("[ProductService.addProduct] Server returned the data" + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private getPath(categoryId?: number): string {
    return categoryId ? this.path + "?categoryId=" + categoryId : this.path;
  }

  private handleError(handleError: HttpErrorResponse) {
    let errorMessage = '';
    if (handleError.error instanceof ErrorEvent) {
      errorMessage = 'Bir hata olustu: ' + handleError.message;
    } else {
      errorMessage = 'Sistemde bir hata olustu'
    }
    return throwError(errorMessage);
  }
}
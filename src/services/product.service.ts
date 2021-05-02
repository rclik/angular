import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { tap, catchError } from 'rxjs/operators';
import { Product } from 'src/app/product/product';

@Injectable()
export class ProductService {
  path: string = 'http://localhost:3000/products';

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.path).pipe(
      tap(),
      catchError(this.handleError)
    );
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
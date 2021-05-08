import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Category } from 'src/app/category/category';

@Injectable()
export class CategoryService {

  private path: string = "http://localhost:3000/categories";

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.path).pipe(
      tap(data=> console.log(JSON.stringify(data))), 
      catchError(this.handleError));
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

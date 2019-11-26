import { Injectable } from '@angular/core';
import { BookCategoryComponent } from './book-category.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookCategoryService {

  categories: any;
  url = 'http://127.0.0.1:3000';

  private _bookCategoryComponent: BookCategoryComponent;

  constructor(private httpClient: HttpClient) { }

  set bookCategoryComponent(value: BookCategoryComponent){
    this._bookCategoryComponent = value;
  }

  booksByCategory(categoryId){
    const req = this.httpClient.get(`${this.url}/category/${categoryId}/books`).toPromise();

    req.then((books) => {
      console.log(books);
      this._bookCategoryComponent.books = books;
    })

  }
}

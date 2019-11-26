import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorsComponent } from './authors.component';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  url = 'http://127.0.0.1:3000';

  private _authorsComponent: AuthorsComponent;

  constructor(private httpClient: HttpClient) { }

  set authorsComponent(value: AuthorsComponent){
    this._authorsComponent = value;
  }

  booksByAuthor(authorId){
    const req = this.httpClient.get(`${this.url}/author/${authorId}/books`).toPromise();

    req.then((books) => {
      console.log(books);
      this._authorsComponent.books = books;
    })

  }
}

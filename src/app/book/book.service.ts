import { Injectable } from '@angular/core';
import { BookComponent } from './book.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  categories: any;
  url = 'http://127.0.0.1:3000';

  private _bookComponent: BookComponent;

  constructor(private httpClient: HttpClient) { }

  set bookComponent(value: BookComponent){
    this._bookComponent = value;
  }

  getBook(isbn){
    // console.log(isbn)
    const req = this.httpClient.get(`${this.url}/book/${isbn}`).toPromise();

    req.then((book) => {
      // console.log(book);
      this._bookComponent.book = book[0];
    })

    // const req2 = this.httpClient.get(`${this.url}/book/${isbn}/authors`).toPromise();

    // req2.then((authors) => {
    //   // console.log(authors);
    //   let stringAuthors = '';
    //   for(let i in authors){
    //     // console.log(authors[i]);
    //     stringAuthors += authors[i].nameF + ' ' + authors[i].nameL + ', ';
    //   }

    //   stringAuthors = stringAuthors.substring(0,(stringAuthors.length - 2));

    //   // console.log(stringAuthors)

    //   this._bookComponent.authors = stringAuthors;
    // })
  }

  addCarShopping(isbn){
    const req = this.httpClient.post(`${this.url}/addCar`, isbn).toPromise();

    req.then((book) => {
      // console.log(book[0]);
      this._bookComponent.book = book[0]
    })
  }

}

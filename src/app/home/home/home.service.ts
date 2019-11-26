import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HomeComponent} from './home.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url = 'http://127.0.0.1:3000';
  // search = {};
  // searchField: boolean

  private _homeComponent: HomeComponent;

  constructor(private httpClient: HttpClient) { }

  set homeComponent(value: HomeComponent){
    this._homeComponent = value;
  }
  //

  getBooksAleatories(){
    const req = this.httpClient.get(`${this.url}/books-aleatories`).toPromise();

    req.then((books) => {
      // console.log(books);
      // this._homeComponent.search = false;
      this._homeComponent.books = books;
    })
  }

  // getSearch(field){
  //   this.search = {
  //     'search' : field
  //   }

  //   const req = this.httpClient.post(`${this.url}/search`, this.search).toPromise();

  //   req.then((books) => {
  //     console.log(books);
  //     this._homeComponent.search = true;
  //     this._homeComponent.books = books;
  //   })
  // }

}

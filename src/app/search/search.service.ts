import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchComponent } from './search.component';
import { NavbarService } from '../navbar/navbar.service';



@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url = 'http://127.0.0.1:3000';
  search = {};
  searchField = '';

  private _searchComponent: SearchComponent;

  constructor(private httpClient: HttpClient,
              private navbarService: NavbarService) { }

  set searchComponent(value: SearchComponent){
    this._searchComponent = value;
  }
  //

  getBooks(){
    this.search = {
      'search' : this.searchField
    }

    const req = this.httpClient.post(`${this.url}/search`, this.search).toPromise();

    req.then((books) => {
      // console.log(books);
      this._searchComponent.books = books;
    })
  }
}

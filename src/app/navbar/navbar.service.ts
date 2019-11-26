import { Injectable } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  categories: any;
  requests = [];
  url = 'http://127.0.0.1:3000';

  private _navbarComponent: NavbarComponent;

  constructor(private httpClient: HttpClient) { }

  set navbarComponent(value: NavbarComponent){
    this._navbarComponent = value;
  }

  getMenu(){
    // sessionStorage.setItem('book', null)

    console.log(JSON.parse(sessionStorage.getItem('book')))

    if(JSON.parse(sessionStorage.getItem('book')) == null){
      sessionStorage.setItem('book', JSON.stringify([]))
    }
    
    const req = this.httpClient.get(`${this.url}/menu`).toPromise();

    req.then((categories) => {
      // console.log(categories);
      this._navbarComponent.categories = categories
    })
  }

}

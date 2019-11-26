import { Injectable } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { HomeComponent } from '../home/home/home.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  categories: any;
  url = 'http://127.0.0.1:3000';

  private _sidebarComponent: SidebarComponent;
  private _homeComponent: HomeComponent;

  constructor(private httpClient: HttpClient) { }

  set sidebarComponent(value: SidebarComponent){
    this._sidebarComponent = value;
  }

  set homeComponent(value: HomeComponent){
    this._homeComponent = value;
  }

  getMenu(){
    const req = this.httpClient.get(`${this.url}/menu`).toPromise();

    req.then((categories) => {
      // console.log(categories);
      this._sidebarComponent.categories = categories
    })
  }
}

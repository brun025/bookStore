import { Injectable } from '@angular/core';
import { CardCategoriesComponent } from './card-categories.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardCategoriesService {

  categories: any;
  url = 'http://127.0.0.1:3000';

  private _cardCategoriesComponent: CardCategoriesComponent;

  constructor(private httpClient: HttpClient) { }

  set cardCategoriesComponent(value: CardCategoriesComponent){
    this._cardCategoriesComponent = value;
  }

  getMenu(){
    const req = this.httpClient.get(`${this.url}/menu`).toPromise();

    req.then((categories) => {
      // console.log(categories);
      this._cardCategoriesComponent.categories = categories
    })
  }
}

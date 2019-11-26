import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestConfirmationComponent } from './request-confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class RequestConfirmationService {

  categories: any;
  requests = [];
  resposta: any;
  total = {
    'sub': 0,
    'frete': 0,
    'soma': 0,
  }
  url = 'http://127.0.0.1:3000';

  private _requestConfirmationComponent: RequestConfirmationComponent;

  constructor(private httpClient: HttpClient) { }

  set requestConfirmationComponent(value: RequestConfirmationComponent){
    this._requestConfirmationComponent = value;
  }

  getOrder(orderId){

    const req = this.httpClient.get(`${this.url}/orders/${orderId}`).toPromise();

    req.then((order) => {
      console.log(order);
      this._requestConfirmationComponent.order = order;
      this.calcTotal(order);
    })
  }

  calcTotal(order){
    this.total.sub = 0;
    this.total.frete = 0;

    for(let i in order){
      this.total.sub += order[i].qty * order[i].price;
      this.total.frete += order[i].qty;
    }

    this.total.frete = 3.49 + ((this.total.frete - 1) * 0.99);
    // if(this.total.frete > 1){
    //   this.total.frete -= 1 * 0.99 + 3.49;
    // }
    // else{
    //   this.total.frete += 3.49;
    // }

    this.total.soma = this.total.frete + this.total.sub;

    this._requestConfirmationComponent.total = this.total;
  }
}

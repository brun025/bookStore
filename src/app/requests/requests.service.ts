import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestsComponent } from './requests.component';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  categories: any;
  url = 'http://127.0.0.1:3000';

  private _requestsComponent: RequestsComponent;

  constructor(private httpClient: HttpClient) { }

  set requestsComponent(value: RequestsComponent){
    this._requestsComponent = value;
  }

  getRequests(){
    const req = this.httpClient.get(`${this.url}/requests`).toPromise();

    req.then((request) => {
      console.log(request);
      // this._requestsComponent.requests = request;
    })
  }
}

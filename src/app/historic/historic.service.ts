import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HistoricComponent } from './historic.component';

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

  url = 'http://127.0.0.1:3000';

  private _historicComponent: HistoricComponent;

  constructor(private httpClient: HttpClient) { }

  set historicComponent(value: HistoricComponent){
    this._historicComponent = value;
  }

  getHistorics(id){
    console.log(id)
    const req = this.httpClient.get(`${this.url}/historic/${id}`).toPromise();

    req.then((request) => {
      console.log(request);
      this._historicComponent.requests = request;
    })
  }
}

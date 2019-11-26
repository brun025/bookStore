import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserFormComponent } from './user-form.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  resposta: any;
  user = {};
  book = {};
  findUser: boolean;
  dados: any;
  msg: string;
  url = 'http://127.0.0.1:3000';

  private _userFormComponent: UserFormComponent;

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  set userFormComponent(value: UserFormComponent){
    this._userFormComponent = value;
  }

  postClient(dados){

    if(!this.findUser){
      const req = this.httpClient.post(`${this.url}/client`, dados).toPromise();
  
      req.then((resposta) => {
        // console.log(resposta)
        this.resposta = resposta
        this.postOrder(this.resposta.insertId);
      }).catch((erro) => {
        console.log(erro)
      });
    }
    else{
      //atualiza cliente
      const req = this.httpClient.patch(`${this.url}/client/${parseInt(this.user["custID"])}`, dados).toPromise();
  
      req.then((resposta) => {
        this.resposta = resposta
        // console.log(this.resposta)
        this.postOrder(this.user["custID"])
      }).catch((erro) => {
        console.log(erro)
      });
    }

  }

  postOrder(customerId){

    this.dados = {
      'custID' : customerId,
      'orderdate' : (this.dataHoje()).toString(),
    }

    const req = this.httpClient.post(`${this.url}/request-order`, this.dados).toPromise();

    req.then((resposta) => {
      // console.log(resposta)

      this.resposta = resposta
      this.postOrderRequest(this.resposta.insertId);
    }).catch((erro) => {
      console.log(erro)
    });

  }

  postOrderRequest(orderId){
    // console.log(orderId, JSON.parse(sessionStorage.getItem('book')))
    let req;

    for(let i in JSON.parse(sessionStorage.getItem('book'))){
      this.book = JSON.parse(sessionStorage.getItem('book'))[i];
      this.book["orderID"] = orderId;
      this.book["price"] = this.book["price"] - (this.book["price"] * 20 / 100)
      // console.log(this.book)
      req = this.httpClient.post(`${this.url}/orderItem`, this.book).toPromise();

      req.then((resposta) => {
        console.log(resposta)
        this.resposta = resposta
      }).catch((erro) => {
        console.log(erro)
      });
    }

    // apagando variável session de pedidos
    sessionStorage.setItem('book', JSON.stringify([]))

    this.router.navigateByUrl(`/request-confirmation/${orderId}`);
  }

  dataHoje() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    return [dia, mes, ano].join('/');
}

}

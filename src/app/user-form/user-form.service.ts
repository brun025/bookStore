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
  message = {};
  findUser: boolean;
  dados: any;
  msg: string;
  total = {
    'sub': 0,
    'frete': 0,
    'soma': 0,
  }
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
        // console.log(resposta)
        this.resposta = resposta
      }).catch((erro) => {
        console.log(erro)
      });
    }

    // apagando variável session de pedidos
    this.sendMail(this._userFormComponent.dados, JSON.parse(sessionStorage.getItem('book')), orderId);
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

  sendMail(dados, order, orderId){
    let products = '';
    
    for(let i in order){
      this.total.sub += order[i].qtd * (order[i].price - (order[i].price * 20 / 100));
      this.total.frete += parseInt(order[i].qtd);

      products += '<tr>'+
                    `<td>${parseInt(i)+1}-</td>`+
                    `<td>${order[i].title}-</td>`+
                    `<td>${order[i].qtd}</td>`+
                  '</tr>';
    }

    this.total.frete = 3.49 + ((this.total.frete - 1) * 0.99);
    this.total.soma = this.total.frete + this.total.sub;

    this.message = {
      'message' : `<strong>Número do pedido: ${orderId}</strong><br/><br/>`+
                  '<strong>Produtos comprados:</strong><br/>'+
                  '<table>'+
                    '<thead>'+
                      '<th>'+
                        '<td>#</td>'+
                        '<td>Título</td>'+
                        '<td>Quantidade</td>'+
                      '</th>'+
                    '</thead>'+
                    '<tbody>'+
                        products+
                    '</tbody>'+
                  '</table><br/><br/>'+
                  '<strong>Enviar para:</strong><br/>'+
                  `<span>${dados.fname} ${dados.lname}</span><br/>` +
                  `<span>${dados.street}</span><br/>`+
                  `<span>${dados.city} ${dados.state} ${dados.zip}</span><br/><br/>`+
                  `<strong>Total: ${this.ajuste(this.total.soma, 2)}</strong><br/><br/>`+
                  '<span>Seu pedido deve chegar via Sedex dentro de 3-5 dias úteis.</span><br/>'+
                  '<span>Obrigado por comprar na GeekBooks.</span><br/>',
      'subject' : 'Confirmação de pedido GeekBooks',
      'email' : dados.email
    }
    
    const req = this.httpClient.post(`${this.url}/sendMail/`, this.message).toPromise();

    req.then((resposta) => {
      console.log(resposta)
    }).catch((erro) => {
      console.log(erro)
    });
  }

  ajuste(nr, casas) {
    const og = Math.pow(10, casas)
    const result = Math.floor(nr * og) / og;
    return result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

}

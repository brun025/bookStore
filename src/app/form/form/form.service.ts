import { Injectable } from '@angular/core';
import { FormComponent } from './form.component';
import { HttpClient } from '@angular/common/http';
import { isObject } from 'util';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private _formComponent: FormComponent;
  
  constructor(private httpClient: HttpClient) { }

  set formComponent(value: FormComponent){
    this._formComponent = value;
  }

  sendMail(item){
    item.message = 'Recebemos seu pedido de suporte, está em fase de análise, em breve retornaremos contato. Obrigado!'
    item.subject = 'Pedido recebido'
    const req = this.httpClient.post('http://127.0.0.1:3000/sendMail/', item).toPromise();

    req.then((resposta) => {
      console.log(resposta)
    }).catch((erro) => {
      console.log(erro)
    });
  }

  getItem(_item){
    // console.log(item.code)
    const req = this.httpClient.get('http://127.0.0.1:3000/items/code/' + _item.code).toPromise();

    req.then((item) => {
      if(isObject(item[0])){
        this.getUpdate(item[0]);
      }
      else{
        // console.log('entrou')
        this.sendMail(_item);
        this.post(_item)
      }
    })
  };

  getUpdate(item){
    // console.log(item)
    item.amount += 1;
    // console.log(item.amount)
    const req = this.httpClient.patch('http://127.0.0.1:3000/items/code/', item).toPromise();

    req.then((resposta) => {
      console.log(resposta)
      this._formComponent.item = {};
    }).catch((erro) => {
      console.log(erro)
    });
  };

  getTypes(){
    const req = this.httpClient.get('http://127.0.0.1:3000/types/').toPromise();

    req.then((types) => {
      this._formComponent.types = types;
    })
  }

  post(item){
    console.log(item)
    item.status = 'Aguardando';
    item.amount = 1;
    item.date = this.obterDataAtual();

    const req = this.httpClient.post("http://127.0.0.1:3000/items", item).toPromise();

    req.then((resposta) => {
      console.log(resposta)
      this._formComponent.item = {};
    }).catch((erro) => {
      console.log(erro)
    });
  }

  obterDataAtual() {
      const date = new Date();

      const ano = date.getFullYear();
      const mes = date.getMonth();
      const dia = date.getDate();

      const h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();

      let mesValor = '';
      let diaValor = '';

      mesValor = ((mes < 10) ? '0' : '').concat(mes.toString())
      diaValor = ((dia < 10) ? '0' : '').concat(dia.toString())

      return ano.toString().concat('-').concat(mesValor).concat('-').concat(diaValor).concat(' ').concat(h.toString()).concat(':').concat(m.toString()).concat(':').concat(s.toString());
  }
}

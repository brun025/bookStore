import { Injectable } from '@angular/core';
import { ClientComponent } from './client.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserFormService } from '../user-form/user-form.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  user: any;
  url = 'http://127.0.0.1:3000';

  private _clientComponent: ClientComponent;

  constructor(private httpClient: HttpClient,
              private router: Router,
              private userFormService: UserFormService) { }

  set clientComponent(value: ClientComponent){
    this._clientComponent = value;
  }

  getUser(email){

    this.user = {
      'email' : email
    }
    const req = this.httpClient.post(`${this.url}/user`, this.user).toPromise();

    this.user = [];
    req.then((user) => {
      this.user = user;
      if(this.user.length == 0){
        this.userFormService.findUser = false;
        this.userFormService.msg = 'Bem vindo ao nosso site<br>Por favor, forneça um endereço para entrega'
        this.router.navigateByUrl('/client/form');
      }
      else{
        this.userFormService.findUser = true;
        this.userFormService.user = user[0];
        this.userFormService.msg = 'Bem vindo de volta<br/>Por favor, confirme seu endereço de entrega'
        this.router.navigateByUrl('/client/form');
      }
    })
  }
}

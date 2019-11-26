import { Injectable } from '@angular/core';
import { UserListComponent } from './user-list.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  resposta: any

  private _userListComponent: UserListComponent;

  constructor(private httpClient: HttpClient) { }

  set userListComponent(value: UserListComponent){
    this._userListComponent = value;
  }

  showModalInsert(){
    this._userListComponent.userNewModal.showModal();
  }

  showModalEdit(user){
    this._userListComponent.userEditModal._user = user;
    this._userListComponent.userEditModal.dados = user;
    this._userListComponent.userEditModal.showModal();
  }

  showModalDelete(id: number){
    this._userListComponent.userDeleteModal.user_id = id;
    this._userListComponent.userDeleteModal.showModal();
  }

  getUsers(){
    const req = this.httpClient.get('http://127.0.0.1:3000/users/').toPromise();

    req.then((users) => {
      this._userListComponent.users = users
    })
  }

  post(user){
    const req = this.httpClient.post("http://127.0.0.1:3000/users", user).toPromise();

    req.then((resposta) => {
      this.resposta = resposta
      this.getUsers();
      // console.log(this.resposta)
    }).catch((erro) => {
      console.log(erro)
    });
  }

  destroy(id) {
    const req = this.httpClient.delete("http://127.0.0.1:3000/users/" + id).toPromise();

    req.then((resposta) => {
      this.resposta = resposta;
      this.getUsers();
    }).catch((erro) => {
      this.resposta = erro;
    });
  }

  update(user, dados) {
    console.log(user.id)
    const req = this.httpClient.patch("http://127.0.0.1:3000/users/" + user.id, dados).toPromise();

    req.then((resposta) => {
      this.resposta = resposta;
      this.getUsers();
    }).catch((erro) => {
      this.resposta = erro;
    });
  }

}


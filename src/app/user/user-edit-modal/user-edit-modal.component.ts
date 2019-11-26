import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { UserService } from '../user-list/user.service';

@Component({
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {
  _user: any;
  dados: any;
  resposta: any;

  @ViewChild(ModalComponent, null)
  modal: ModalComponent;

  constructor(protected userService: UserService) {
  }

  ngOnInit() {
    this.dados = {};
    this.resposta = {};
  }

  submit() {
    this.userService.update(this._user, this.dados);
    this.modal.hide();
  }

  showModal(){
    this.modal.show();
  }
}




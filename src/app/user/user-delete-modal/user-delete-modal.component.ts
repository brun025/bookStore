import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user-list/user.service';

@Component({
  selector: 'user-delete-modal',
  templateUrl: './user-delete-modal.component.html',
  styleUrls: ['./user-delete-modal.component.css']
})
export class UserDeleteModalComponent implements OnInit {
  user_id: number;

  @ViewChild(ModalComponent, null)
  modal: ModalComponent;

  constructor( protected userService: UserService ) {
  }

  ngOnInit() {
  } 

  showModal(){
    this.modal.show();
  }

  destroy() {
    this.userService.destroy(this.user_id);
    this.modal.hide();
  }

}



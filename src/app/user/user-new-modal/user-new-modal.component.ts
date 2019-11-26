import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { UserService } from '../user-list/user.service';

@Component({
  selector: 'user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {
  user: any;

  @ViewChild(ModalComponent, null)
  modal: ModalComponent;

  constructor( protected userService: UserService ) { }

  ngOnInit() {
    this.user = {};
  }

  submit(){
    this.userService.post(this.user);
    this.modal.hide();
  }

  showModal(){
    this.modal.show();
  }


}



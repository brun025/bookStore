import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarService } from 'src/app/navbar/navbar.service';
import { UserService } from './user.service';
import { UserNewModalComponent } from '../user-new-modal/user-new-modal.component';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from '../user-delete-modal/user-delete-modal.component';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any;

  @ViewChild(UserNewModalComponent, null)
  userNewModal: UserNewModalComponent;

  @ViewChild(UserEditModalComponent, null)
  userEditModal: UserEditModalComponent;

  @ViewChild(UserDeleteModalComponent, null)
  userDeleteModal: UserDeleteModalComponent;


  constructor( protected userService: UserService) {
            this.userService.userListComponent = this;
  }

  ngOnInit() {
    this.userService.getUsers()
  }

}



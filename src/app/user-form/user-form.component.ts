import { Component, OnInit } from '@angular/core';
import { UserFormService } from './user-form.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  dados: any;
  msg: string

  constructor( protected userFormService : UserFormService) {
    this.userFormService.userFormComponent = this;
   }

  ngOnInit() {
    this.dados = this.userFormService.user;
    this.msg = this.userFormService.msg;
  }

  submit(){
    this.userFormService.postClient(this.dados);
  }

}

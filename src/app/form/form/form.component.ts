import { Component, OnInit } from '@angular/core';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  item: any;
  types: any;
  code: boolean;

  constructor( protected formService: FormService) {
    this.formService.formComponent = this;
  }

  ngOnInit() {
    this.item = {};
    this.types = this.formService.getTypes();
  }

  submit(){
    this.formService.getItem(this.item);

    // console.log(this.code)
    // if(this.code){
    //   this.formService.getUpdate(this.item);
    // }
    // else{
    //   this.formService.post(this.item);
    // }
  }

}

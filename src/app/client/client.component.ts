import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  email: string;
  qtd: number;
  constructor( protected clientService: ClientService) {
    this.clientService.clientComponent = this;
   }

  ngOnInit() {
    this.email = '';
    this.qtdItems();
  }

  submit(){
    this.clientService.getUser(this.email);
  }

  qtdItems(){
    this.qtd = 0;
    for(let i in JSON.parse(sessionStorage.getItem('book'))){
      this.qtd += parseInt(JSON.parse(sessionStorage.getItem('book'))[i].qtd);
    }
  }

}

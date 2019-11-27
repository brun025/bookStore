import { Component, OnInit } from '@angular/core';
import { RequestsService } from './requests.service';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  requests: any;
  totalProducts: number;
  frete: number;
  amount: number;
  qtd = 1;

  constructor( private requestService: RequestsService,
               protected navbarService: NavbarService) {
               this.requestService.requestsComponent = this;
   }

  ngOnInit() {
    this.requests = [];
    this.totalProducts = 0;
    this.frete = 0;
    this.amount = 0;
    this.getRequests();
  }

  getRequests(){
    this.requests = JSON.parse(sessionStorage.getItem('book'));
    // this.requests = this.navbarService.requests;
    
    for(let i in this.requests){
      this.totalProducts += this.requests[i].qtd * (this.requests[i].price - (this.requests[i].price * 20 / 100));
      this.frete += parseInt(this.requests[i].qtd);
      this.amount += parseInt(this.requests[i].qtd);
    }
    // console.log(this.frete)
    this.frete = 3.49 + ((this.frete - 1) * 0.99);

    // this.ajuste(this.totalProducts, 2);
    // this.ajuste(this.frete, 2);
    // console.log(this.requests);
  }

  changeQtd(isbn, element){
    // console.log(isbn, element.target.value);

    for(let i in this.requests){
      if(this.requests[i].ISBN == isbn){
        if(element.target.value != 0){

          if(this.requests[i].qtd - element.target.value < 0){
            // console.log(this.totalProducts, element.target.value * this.requests[i].price, element.target.value * 0.99)
            this.totalProducts += this.requests[i].price  - (this.requests[i].price * 20 / 100);
            this.frete += 0.99;
            this.amount += 1;
          }
          else{
            this.totalProducts -= this.requests[i].price  - (this.requests[i].price * 20 / 100);
            this.frete -= 0.99;
            this.amount -= 1;
          }

          this.requests[i].qtd = element.target.value;
        }
        else{
          this.totalProducts -= this.requests[i].price  - (this.requests[i].price * 20 / 100);
          this.requests.splice(i, 1);
          this.frete -= 0.99;
        }

        sessionStorage.setItem('book', JSON.stringify(this.requests));
        break;
      }
    }
  }

  ajuste(nr, casas) {
    const og = Math.pow(10, casas)
    return Math.floor(nr * og) / og;
    // return result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

}

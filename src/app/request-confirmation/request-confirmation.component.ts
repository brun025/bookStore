import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestConfirmationService } from './request-confirmation.service';

@Component({
  selector: 'app-request-confirmation',
  templateUrl: './request-confirmation.component.html',
  styleUrls: ['./request-confirmation.component.css']
})
export class RequestConfirmationComponent implements OnInit {

  orderId: number;
  order: any;
  total = {};

  constructor(private route:ActivatedRoute,
              private requestConfirmationService: RequestConfirmationService) { 
    this.requestConfirmationService.requestConfirmationComponent = this;
  }

  ngOnInit() {
    this.orderId = parseInt(this.route.snapshot.params['orderId']);
    this.order = [];
    // this.route.params.subscribe(params => this.orderId = params['orderId']);
    this.requestConfirmationService.getOrder(this.orderId);
  }

  ajuste(nr, casas) {
    const og = Math.pow(10, casas)
    const result = Math.floor(nr * og) / og;
    return result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}

import { Component, OnInit } from '@angular/core';
import { HistoricService } from './historic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historic',
  templateUrl: './historic.component.html',
  styleUrls: ['./historic.component.css']
})
export class HistoricComponent implements OnInit {

  requests: any;

  constructor(private historicService: HistoricService,
              private route:ActivatedRoute) {
              this.historicService.historicComponent = this;
   }

  ngOnInit() {

    this.requests = [];
    this.historicService.getHistorics(parseInt(this.route.snapshot.params['clientId']));
  }

}

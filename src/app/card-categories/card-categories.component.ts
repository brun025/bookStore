import { Component, OnInit } from '@angular/core';
import { CardCategoriesService } from './card-categories.service';

@Component({
  selector: 'card-categories',
  templateUrl: './card-categories.component.html',
  styleUrls: ['./card-categories.component.css']
})
export class CardCategoriesComponent implements OnInit {

  categories: any;

  constructor(protected cardCategoriesService: CardCategoriesService ) { 
    this.cardCategoriesService.cardCategoriesComponent = this;
  }

  ngOnInit() {
    this.categories = [];
    this.cardCategoriesService.getMenu();
  }

}

import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: any;
  // search: boolean;

  constructor(protected homeService: HomeService) { 
    this.homeService.homeComponent = this;
  }

  ngOnInit() {
    // this.search = false;
    this.books = [];
    // this.homeService.searchField = true;
    this.homeService.getBooksAleatories();
  }

}

import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  books: any;

  constructor(protected searchService: SearchService) { 
    this.searchService.searchComponent = this;
  }

  ngOnInit() {
    this.books = [];
    this.searchService.getBooks();
  }
}

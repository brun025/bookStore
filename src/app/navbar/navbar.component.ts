import { Component, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';
import { HomeService } from '../home/home/home.service';
import { SearchService } from '../search/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories: any;
  searching: string;

  constructor(protected navbarService: NavbarService,
              protected homeService: HomeService,
              protected searchService: SearchService,
              private router: Router) { 
    this.navbarService.navbarComponent = this;
  }

  ngOnInit() {
    this.categories = [];
    this.searching = '';
    this.navbarService.getMenu();
  }

  submit(){
    this.searchService.searchField = this.searching;
    this.router.navigateByUrl('/search');
    // this.homeService.getSearch(this.searching);
  }

  changeSearch(element){
    // console.log(element.target.value);
    this.searchService.searchField = element.target.value;
    this.searchService.getBooks();
    // this.router.navigateByUrl('/search');
  }

}

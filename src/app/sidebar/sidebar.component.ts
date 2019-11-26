import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { HomeService } from '../home/home/home.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories: any;
  searching: string;

  constructor(protected sidebarService: SidebarService,
              protected homeService: HomeService ) { 
    this.sidebarService.sidebarComponent = this;
  }

  ngOnInit() {
    this.categories = [];
    this.searching = '';
    this.sidebarService.getMenu();
  }

  search(){
    // console.log(this.searching)
    // this.homeService.getSearch(this.searching);

  }

}

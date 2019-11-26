import { Component, OnInit } from '@angular/core';
import { BookCategoryService } from './book-category.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-book-category',
  templateUrl: './book-category.component.html',
  styleUrls: ['./book-category.component.css']
})
export class BookCategoryComponent implements OnInit {

  books: any;
  categoryId: number;
  categoryName: String;

  constructor(protected bookCategoryService: BookCategoryService,
              private route:ActivatedRoute,
              private router: Router) { 
    this.bookCategoryService.bookCategoryComponent = this;
    this.routeEvent(this.router);
  }

  ngOnInit() {
    this.books = [];
    this.begin();
  }

  begin(){
    this.categoryId = this.route.snapshot.params['categoryId'];
    this.bookCategoryService.booksByCategory(this.categoryId);
  }

  routeEvent(router: Router){
    router.events.subscribe(e => {
      if(e instanceof NavigationEnd){
        // console.log(this.books)
        if(this.books != undefined){
          this.begin();
        }
      }
    });
  }

}

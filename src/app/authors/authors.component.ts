import { Component, OnInit } from '@angular/core';
import { AuthorsService } from './authors.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  books: any;
  authorId: number;

  constructor(protected authorsService: AuthorsService,
              private route:ActivatedRoute,
              private router: Router) { 
              this.route.params.subscribe(params => this.authorId = params['authorId']);
              this.authorsService.authorsComponent = this;
  }

  ngOnInit() {
    this.books = [];
    this.begin();
  }

  begin(){
    this.authorsService.booksByAuthor(this.authorId);
  }

}

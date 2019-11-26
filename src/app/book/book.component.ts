import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BookService } from './book.service';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  isbn: string;
  book: any;
  authors: any;
  books: any;

  constructor(private route:ActivatedRoute,
              protected bookService: BookService,
              protected navbarService: NavbarService,
              private router: Router){
    this.bookService.bookComponent = this;
              }


  ngOnInit(){
      this.isbn = this.route.snapshot.params['isbn'];
      this.authors = [];
      this.bookService.getBook(this.isbn);
      // console.log(this.isbn)
  }

  ajuste(nr, casas) {
    const og = Math.pow(10, casas)
    const result = Math.floor(nr * og) / og;
    return result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  addCarShopping(book){
    book.qtd = 1;
    this.books = JSON.parse(sessionStorage.getItem('book'));
    this.books.push(book);
    sessionStorage.setItem('book', JSON.stringify(this.books));
    // console.log(JSON.parse(sessionStorage.getItem('book')))

    // this.navbarService.requests.push(book);
    // this.bookService.addCarShopping(this.isbn);
    this.router.navigateByUrl('/carShopping');
  }
}

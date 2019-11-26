import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ModalComponent } from './modal/modal.component';
import { HomeComponent } from './home/home/home.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserNewModalComponent } from './user/user-new-modal/user-new-modal.component';
import { UserEditModalComponent } from './user/user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from './user/user-delete-modal/user-delete-modal.component';
import { FormComponent } from './form/form/form.component';
import { FilterPipe } from './filter.pipe';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardCategoriesComponent } from './card-categories/card-categories.component';
import { BookComponent } from './book/book.component';
import { RequestsComponent } from './requests/requests.component';
import { FooterComponent } from './footer/footer.component';
import { BookCategoryComponent } from './book-category/book-category.component';
import { ClientComponent } from './client/client.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RequestConfirmationComponent } from './request-confirmation/request-confirmation.component';
import { HistoricComponent } from './historic/historic.component';
import { AuthorsComponent } from './authors/authors.component';
import { SearchComponent } from './search/search.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'book/:isbn', component: BookComponent },
  { path: 'carShopping', component: RequestsComponent },
  { path: 'category/:categoryId/books', component: BookCategoryComponent },
  { path: 'client', component: ClientComponent },
  { path: 'client/form', component: UserFormComponent },
  { path: 'request-confirmation/:orderId', component: RequestConfirmationComponent },
  { path: 'author/:authorId', component: AuthorsComponent },
  { path: 'historic/:clientId', component: HistoricComponent },
  { path: 'user/list', component: UserListComponent },
  { path: 'form/list', component: FormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    NavbarComponent,
    ModalComponent,
    HomeComponent,
    UserListComponent,
    UserNewModalComponent,
    UserEditModalComponent,
    UserDeleteModalComponent,
    FormComponent,
    SidebarComponent,
    CardCategoriesComponent,
    BookComponent,
    RequestsComponent,
    FooterComponent,
    BookCategoryComponent,
    ClientComponent,
    UserFormComponent,
    RequestConfirmationComponent,
    HistoricComponent,
    AuthorsComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

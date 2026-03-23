
import { Routes } from '@angular/router';
import { BookDetail } from './components/book-detail/book-detail';
import { BookList } from './components/book-list/book-list';
import { BookAdd } from './components/book-add/book-add';
import { BookUpdate } from './components/book-update/book-update';
import { BookDelete } from './components/book-delete/book-delete';


export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookList },
  { path: 'books/add', component: BookAdd },
  { path: 'books/update/:id', component: BookUpdate },
  { path: 'books/delete/:id', component: BookDelete },
  { path: 'books/:id', component: BookDetail },
];

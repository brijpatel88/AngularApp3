// src/app/components/book-list/book-list.ts

import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';

/* 
 This component loads all books from the service
 and stores them in the books array for display.
*/
@Component({
 selector: 'app-book-list',
 standalone: true,
 imports: [CommonModule, RouterLink],
 templateUrl: './book-list.html',
 styleUrl: './book-list.css',
})
export class BookList implements OnInit {
 books = signal<Book[]>([]);
 favorites = signal<number[]>([]);
 favoriteCount = computed(() => this.favorites().length);

 constructor(private bookService: BookService) {}

 /* 
  ngOnInit runs when the component loads.
  We use it to fetch the book list.
 */
 ngOnInit(): void {
   this.loadBooks();
 }
 /* 
  This method gets all books from the service and saves them into the books array.
 */ 
 loadBooks(): void {
   this.bookService.getBooks().subscribe((data) => {
     this.books.set(data);
   });
 }
 /* 
  Add or remove a book id from the favorites signal.
 */
 toggleFavorite(bookId: number): void {
  if (this.favorites().includes(bookId)) {
    this.favorites.set(this.favorites().filter(id => id !== bookId));
  } else {
    this.favorites.set([...this.favorites(), bookId]);
  }
 }
 /* 
  Check whether a book is already in the favorites list.
 */
 isFavorite(bookId: number): boolean {
  return this.favorites().includes(bookId);
 }
 



}
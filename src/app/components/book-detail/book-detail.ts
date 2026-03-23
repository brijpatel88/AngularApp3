// src/app/components/book-detail/book-detail.ts

import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

/* 
 This component reads the book id from the route and loads that single book from the service.
*/
@Component({
 selector: 'app-book-detail',
 standalone: true,
 imports: [CommonModule, RouterLink],
 templateUrl: './book-detail.html',
 styleUrl: './book-detail.css',
})
export class BookDetail implements OnInit {
 book = signal<Book | null>(null);
 constructor(
   private bookService: BookService,
   private route: ActivatedRoute
 ) {}

 /* 
  When the page opens, get the id from the route and load that book from the backend.
 */

 ngOnInit(): void {
   const id = Number(this.route.snapshot.paramMap.get('id'));

   if (id) {
     this.bookService.getBook(id).subscribe((data) => {
       this.book.set(data);
     });
   }
 }
}
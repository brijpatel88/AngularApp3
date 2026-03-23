// src/app/components/book-update/book-update.ts

import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Book } from '../../models/book';

/*
  This component loads a book by id, allows editing,
  and updates it in the backend.
*/
@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-update.html',
  styleUrl: './book-update.css',
})
export class BookUpdate implements OnInit {
  book = signal<Book | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  /*
    Load the selected book when the page opens.
  */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.bookService.getBook(id).subscribe((data) => {
        this.book.set(data);
      });
    }
  }

  /*
    Save the updated book and return to the detail page.
  */
  updateBook(): void {
   const selectedBook = this.book();

   if (selectedBook) {
     this.bookService.updateBook(selectedBook).subscribe(() => {
       this.router.navigate(['/books', selectedBook.id]);
     });
   }
 }
}
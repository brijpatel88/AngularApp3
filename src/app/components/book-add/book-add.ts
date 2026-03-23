// src/app/components/book-add/book-add.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Router, RouterLink } from '@angular/router';
import { Book } from '../../models/book';

/*
  This component creates a new book and sends it to the backend.
*/
@Component({
  selector: 'app-book-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-add.html',
  styleUrl: './book-add.css',
})
export class BookAdd {
  newBook = {
    title: '',
    author: '',
    description: '',
  };

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  /*
    Save the new book, then return to the book list.
  */
  addBook(): void {
    const bookToAdd = this.newBook as Book;

    this.bookService.addBook(bookToAdd).subscribe(() => {
      this.router.navigate(['/books']);
    });
  }
}
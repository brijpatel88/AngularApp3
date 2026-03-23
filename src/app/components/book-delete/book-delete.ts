// src/app/components/book-delete/book-delete.ts

import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book';

/*
  This component shows one book and deletes it after confirmation.
*/
@Component({
  selector: 'app-book-delete',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-delete.html',
  styleUrl: './book-delete.css',
})
export class BookDelete implements OnInit {
  book = signal<Book | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  /*
    Load the selected book before deletion.
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
    Delete the selected book and return to the list.
  */
  deleteBook(): void {
    const selectedBook = this.book();

    if (selectedBook) {
      this.bookService.deleteBook(selectedBook.id).subscribe(() => {
        this.router.navigate(['/books']);
      });
    }
  }
} 
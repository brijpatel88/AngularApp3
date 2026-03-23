// src/app/backend/in-memory-data.service.ts

import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Book } from '../models/book';

/*
  This service simulates a backend API.
  It provides initial book data and Angular treats it like a real server.
*/
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
 /* 
  CreateDB() returns a databse object.
  The key 'books' becomes the API endpoint -> /api/books
 */
  createDb() {
    const books: Book[] = [
      { 
       id: 1, 
       title: 'Atomic Habits',
       author: 'James Clear', 
       description: 'A Practical Guide to Building Good Habits and Breaking Bad Ones.', 
      },
      {
        id: 2, 
        title: 'The Alchemist', 
        author: 'Paulo Coelho', 
        description: 'A story about following your dreams and listening to your heart.', 
      },
      { 
       id: 3, 
       title: 'Rich Dad Poor Dad', 
       author: 'Robert Kiyosaki', 
       description: 'Lessons about money, investing and financial independence.', 
      },
      {
        id: 4,
        title: 'Think and Grow Rich',
        author: 'Napoleon Hill',
        description: 'A Classic book about mindset and success',
      }
    ];
    return { books };
  }

  /*
    Generates a new ID for a book.
  */
  genId(books: Book[]): number {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
  }
}
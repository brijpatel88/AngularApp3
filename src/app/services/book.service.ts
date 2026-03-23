// src/app/services/book.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

/* 
 This service handles all API interactions related to Books.
 Components will use this service instead of calling the API directly.
*/
@Injectable({
 providedIn: 'root',
})
export class BookService {
 /*
  This is the base API URL for our fake backend.
  Because createdDB() returned { books}, the endpoint is /api/books
 */
 private apiUrl = 'api/books';
 constructor(private http: HttpClient) {}

 // Fetch all books from the API
 getBooks(): Observable<Book[]> {
   return this.http.get<Book[]>(this.apiUrl);
 }

 // Get one book by its ID
 getBook(id: number): Observable<Book> {
   return this.http.get<Book>(`${this.apiUrl}/${id}`);
 }

 // Add a new book to the API
 addBook(book: Book): Observable<Book> {
   return this.http.post<Book>(this.apiUrl, book);
 }

 // Update an existing book
 updateBook(book: Book): Observable<Book> {
   return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book);
 }

 // Delete a book by its ID
 deleteBook(id: number): Observable<Book> {
   return this.http.delete<Book>(`${this.apiUrl}/${id}`);
 }
}
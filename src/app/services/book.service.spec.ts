// src/app/services/book.service.spec.ts

// Import Angular testing tools for HttpClient-based services
import { TestBed } from '@angular/core/testing';

// Lets us test and mock HTTP requests
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Import your service
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Adds fake HttpClient so no real backend call happens
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });

    // Get service instance
    service = TestBed.inject(BookService);

    // Lets us control and verify HTTP requests
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Make sure no unexpected HTTP calls are left open
  afterEach(() => {
    httpMock.verify();
  });

  // ✅ Test 1: service should be created
  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  // ✅ Test 2: should return list of books
  it('should fetch books using GET', () => {
    const mockBooks = [
      { id: 1, title: 'Book One', author: 'Author One' },
      { id: 2, title: 'Book Two', author: 'Author Two' }
    ];

    service.getBooks().subscribe((books) => {
      expect(books.length).toBe(2);
      expect(books[0].title).toBe('Book One');
    });

    // Match the API URL used inside getBooks()
    const req = httpMock.expectOne((request) => request.method === 'GET');

    expect(req.request.method).toBe('GET');

    // Send fake response back to the service
    req.flush(mockBooks);
  });

  // ✅ Test 3: should return one book by id
  it('should fetch one book by id using GET', () => {
    const mockBook = { id: 1, title: 'Book One', author: 'Author One' };

    service.getBook(1).subscribe((book) => {
      expect(book.id).toBe(1);
      expect(book.title).toBe('Book One');
    });

    // Match the GET request for a single book
    const req = httpMock.expectOne((request) => request.method === 'GET');

    expect(req.request.method).toBe('GET');

    // Send fake response
    req.flush(mockBook);
  });
});
// src/app/components/book-add/book-add.spec.ts

// Import Angular testing tools
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

// Import the standalone component we want to test
import { BookAdd } from './book-add';

// RxJS helper to simulate successful service response
import { of } from 'rxjs';

// Import dependencies used by the component
import { BookService } from '../../services/book.service';
import { Router, provideRouter } from '@angular/router';

// Simple dummy component used only for test routing
@Component({
  template: ''
})
class DummyComponent {}

describe('BookAdd', () => {
  let component: BookAdd;
  let fixture: ComponentFixture<BookAdd>;
  let router: Router;

  // Fake BookService for testing
  const mockBookService = {
    addBook: (book: any) => of(book)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Standalone component goes in imports
      imports: [BookAdd],

      providers: [
        // Replace real service with fake one
        { provide: BookService, useValue: mockBookService },

        // Add a fake /books route so navigation succeeds
        provideRouter([
          { path: 'books', component: DummyComponent }
        ])
      ]
    }).compileComponents();

    // Get router instance
    router = TestBed.inject(Router);

    // Create component instance
    fixture = TestBed.createComponent(BookAdd);
    component = fixture.componentInstance;

    // Run component lifecycle
    fixture.detectChanges();
  });

  // Check component is created
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Check form model starts empty
  it('should have empty default form values', () => {
    expect(component.newBook.title).toBe('');
    expect(component.newBook.author).toBe('');
    expect(component.newBook.description).toBe('');
  });

  // Check addBook sends data to the service
  it('should call addBook service method', () => {
    const service = TestBed.inject(BookService);
    const addBookSpy = vi.spyOn(service, 'addBook');

    component.newBook = {
      title: 'Angular Basics',
      author: 'Brijesh',
      description: 'Angular testing example'
    };

    component.addBook();

    expect(addBookSpy).toHaveBeenCalled();
  });

  // Check navigation happens after successful save
  it('should navigate to /books after adding a book', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');

    component.newBook = {
      title: 'Angular Basics',
      author: 'Brijesh',
      description: 'Angular testing example'
    };

    component.addBook();

    expect(navigateSpy).toHaveBeenCalledWith(['/books']);
  });
});
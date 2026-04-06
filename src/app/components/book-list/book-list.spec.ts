// src/app/components/book-list/book-list.spec.ts

// Import Angular testing tools
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Import the standalone component we want to test
import { BookList } from './book-list';

// RxJS helper to return fake observable data
import { of } from 'rxjs';

// Import the service used by the component
import { BookService } from '../../services/book.service';

// Provides router support in standalone component tests
import { provideRouter } from '@angular/router';

describe('BookList', () => {
  let component: BookList;
  let fixture: ComponentFixture<BookList>;

  // Fake service used only for this test
  const mockBookService = {
    getBooks: () =>
      of([
        { id: 1, title: 'Test Book 1' },
        { id: 2, title: 'Test Book 2' }
      ])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Standalone component goes in imports
      imports: [BookList],

      providers: [
        // Replace real service with fake service
        { provide: BookService, useValue: mockBookService },

        // Gives router-related dependencies like routerLink support
        provideRouter([])
      ]
    }).compileComponents();

    // Create component instance
    fixture = TestBed.createComponent(BookList);
    component = fixture.componentInstance;

    // Run lifecycle methods like ngOnInit()
    fixture.detectChanges();
  });

  // Check component is created
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Check service data is loaded into the books signal
  it('should load books from service', () => {
    expect(component.books().length).toBe(2);
    expect(component.books()[0].title).toBe('Test Book 1');
  });
});
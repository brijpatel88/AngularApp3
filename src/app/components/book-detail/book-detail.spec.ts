// src/app/components/book-add/book-add.spec.ts

// Import Angular testing tools
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Import the standalone routed component we want to test
import { BookDetail } from './book-detail';

// RxJS helper to return fake observable data
import { of } from 'rxjs';

// Import dependencies used by the component
import { BookService } from '../../services/book.service';
import { ActivatedRoute, provideRouter } from '@angular/router';

describe('BookDetail', () => {
  let component: BookDetail;
  let fixture: ComponentFixture<BookDetail>;

  // Fake BookService response for one book
  const mockBookService = {
    getBook: (id: number) =>
      of({
        id,
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description'
      })
  };

  // Fake route with id = 1
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => (key === 'id' ? '1' : null)
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Standalone component goes in imports
      imports: [BookDetail],

      providers: [
        // Needed because template uses RouterLink
        provideRouter([]),

        // Replace real service with fake test service
        { provide: BookService, useValue: mockBookService },

        // IMPORTANT: put this AFTER provideRouter so our mock wins
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    // Create component instance
    fixture = TestBed.createComponent(BookDetail);
    component = fixture.componentInstance;

    // Run ngOnInit()
    fixture.detectChanges();
  });

  // Check component is created
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Check route id is used to load the correct book
  it('should load the book based on route id', () => {
    expect(component.book()).toBeTruthy();
    expect(component.book()?.id).toBe(1);
    expect(component.book()?.title).toBe('Test Book');
  });

  // Check service method is called with route id
  it('should call getBook with the route id', () => {
    const service = TestBed.inject(BookService);
    const getBookSpy = vi.spyOn(service, 'getBook');

    component.ngOnInit();

    expect(getBookSpy).toHaveBeenCalledWith(1);
  });
});
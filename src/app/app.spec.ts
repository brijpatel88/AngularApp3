// src/app/app.spec.ts

// Import Angular testing tools
import { TestBed } from '@angular/core/testing';

// Import main app component
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Main app is standalone, so use imports
      imports: [App],
    }).compileComponents();
  });

  // Check app is created successfully
  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
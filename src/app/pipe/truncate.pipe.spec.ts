// src/app/pipe/truncate.pipe.spec.ts

// Import the pipe we want to test
import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    // Create pipe instance before each test
    pipe = new TruncatePipe();
  });

  // Check pipe is created
  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  // Check long text is shortened
  it('should truncate long text and add dots', () => {
    const result = pipe.transform('Angular Testing Example', 10);
    expect(result).toBe('Angular Te...');
  });

  // Check short text stays unchanged
  it('should return the same text if it is short', () => {
    const result = pipe.transform('Angular', 10);
    expect(result).toBe('Angular');
  });

  // Check empty value returns empty string
  it('should return empty string for empty input', () => {
    const result = pipe.transform('', 10);
    expect(result).toBe('');
  });
});
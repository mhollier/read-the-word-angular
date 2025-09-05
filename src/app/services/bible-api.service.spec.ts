// bible-api.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { BibleApiService } from './bible-api.service';
import { BibleFull, BibleSummary, BookSummary, Verse } from '../models/bible.models';

describe('BibleApiService', () => {
  let service: BibleApiService;

  // Keep original JSON.parse to restore after each test
  const originalJsonParse = JSON.parse;

  const fakeSummary: BibleSummary = {
    code: 'WEB',
    title: 'World English Bible',
  };

  const fakeVerses: Verse[] = [
    { book: 'GEN', chapter: 1, verse: 1, verseText: 'In the beginning...' },
    { book: 'GEN', chapter: 1, verse: 2, verseText: 'And the earth was...' },
    { book: 'GEN', chapter: 2, verse: 1, verseText: 'Thus the heavens...' },
    { book: 'MAT', chapter: 1, verse: 1, verseText: 'The book of the generation...' },
  ];

  const fakeBible: BibleFull = {
    info: fakeSummary,
    verses: fakeVerses,
  };

  beforeEach(() => {
    spyOn(JSON, 'parse').and.returnValue(fakeBible);

    TestBed.configureTestingModule({
      providers: [BibleApiService],
    });

    service = TestBed.inject(BibleApiService);
  });

  afterEach(() => {
    // Restore JSON.parse
    (JSON as any).parse = originalJsonParse;
  });

  it('should be created and parse the bundled bible exactly once', () => {
    expect(service).toBeTruthy();
    expect(JSON.parse).toHaveBeenCalledTimes(1);
  });

  it('getBibles() should return the parsed bible summary', () => {
    const summaries = service.getBibles();
    expect(Array.isArray(summaries)).toBeTrue();
    expect(summaries.length).toBe(1);
    expect(summaries[0]).toEqual(fakeSummary);
  });

  it('getBible(code) should return the single loaded bible regardless of code', () => {
    const byWeb = service.getBible('WEB');
    const byOther = service.getBible('ANY');
    expect(byWeb).toBe(fakeBible);
    expect(byOther).toBe(fakeBible);
  });

  describe('Book summaries (overridden for isolation)', () => {
    const stubBooks: BookSummary[] = [
      { code: 'GEN', name: 'Genesis', testament: 'OT', chapters: 50 } as any as BookSummary,
      { code: 'MAT', name: 'Matthew', testament: 'NT', chapters: 28 } as any as BookSummary,
    ];

    beforeEach(() => {
      // Override the private field to avoid relying on the real BOOKS constant
      (service as any).bookSummaries = stubBooks;
    });

    it('getBooks() should return the book summaries array', () => {
      const books = service.getBooks();
      expect(books).toEqual(stubBooks);
      // read-only at the type level; at runtime it is still an array
      expect(books.length).toBe(2);
    });

    it('getBook() should find a book by code or return null', () => {
      expect(service.getBook('WEB', 'GEN')).toEqual(stubBooks[0]);
      expect(service.getBook('WEB', 'MAT')).toEqual(stubBooks[1]);
      expect(service.getBook('WEB', 'PSA')).toBeNull();
    });
  });

  describe('getChapterVerses()', () => {
    it('should return only verses matching bible code, book code, and chapter', () => {
      // Matches WEB/GEN/1 -> first two verses from our fake set
      const result = service.getChapterVerses('WEB', 'GEN', 1);
      expect(result.map(v => `${v.book}.${v.chapter}.${v.verse}`))
        .toEqual(['GEN.1.1', 'GEN.1.2']);
      // Ensure verses from other chapters/books are excluded
      expect(result.find(v => v.chapter !== 1 || v.book !== 'GEN')).toBeUndefined();
    });

    it('should return an empty array when bible code is not found', () => {
      const result = service.getChapterVerses('UNKNOWN', 'GEN', 1);
      expect(Array.isArray(result)).toBeTrue();
      expect(result.length).toBe(0);
    });

    it('should return an empty array when no verses match the book/chapter', () => {
      const result = service.getChapterVerses('WEB', 'GEN', 99);
      expect(result.length).toBe(0);
    });
  });
});

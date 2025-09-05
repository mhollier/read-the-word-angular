// books.component.spec.ts
import { TestBed } from '@angular/core/testing';
import { BooksComponent } from './books.component';
import { BibleApiService } from '../services/bible-api.service';
import { BookSummary } from '../models/bible.models';

describe('BooksComponent', () => {
  let mockBibleApiService: jasmine.SpyObj<BibleApiService>;

  const allBooks: ReadonlyArray<BookSummary> = Object.freeze([
    { code: 'GEN', abbr: 'Gn', title: 'Genesis', testament: 'OT', seq: 1, category: 'Law', chapters: 50 },
    { code: 'EXO', abbr: 'Ex', title: 'Exodus', testament: 'OT', seq: 2, category: 'Law', chapters: 40 },
    { code: 'LEV', abbr: 'Lv', title: 'Leviticus', testament: 'OT', seq: 3, category: 'Law', chapters: 27 },
    { code: 'NUM', abbr: 'Nm', title: 'Numbers', testament: 'OT', seq: 4, category: 'Law', chapters: 36 },
    { code: "MAT", abbr: "Mt", title: "Matthew", testament: "NT", seq: 40, category: "Gospels", chapters: 28 },
    { code: "MAR", abbr: "Mk", title: "Mark", testament: "NT", seq: 41, category: "Gospels", chapters: 16 },
    { code: "LUK", abbr: "Lk", title: "Luke", testament: "NT", seq: 42, category: "Gospels", chapters: 24 },
    // an unexpected entry to ensure filters exclude non-OT/NT
    { code: 'ENO', abbr: 'En', title: '1 Enoch', testament: 'AP', seq: 5, category: 'NA', chapters: 36 }
  ] as any);

  beforeEach(async () => {
    mockBibleApiService = jasmine.createSpyObj<BibleApiService>('BibleApiService', ['getBooks']);
    mockBibleApiService.getBooks.and.returnValue(allBooks as ReadonlyArray<BookSummary>);

    await TestBed.configureTestingModule({
      imports: [BooksComponent],
      providers: [{ provide: BibleApiService, useValue: mockBibleApiService }]
    })
      // avoid loading the external HTML file during tests
      .overrideComponent(BooksComponent, { set: { template: '' } })
      .compileComponents();
  });

  function create(): BooksComponent {
    const fixture = TestBed.createComponent(BooksComponent);
    fixture.detectChanges();
    return fixture.componentInstance;
  }

  it('should create', () => {
    const component = create();
    expect(component).toBeTruthy();
  });

  it('should request books once from BibleApiService at construction', () => {
    const component = create();

    expect(mockBibleApiService.getBooks).toHaveBeenCalledTimes(1);
    // books should be whatever the service returned (by reference is fine)
    expect(component.books).toBe(allBooks);
    expect(component.books.length).toBe(allBooks.length);
  });

  it('getOldTestamentBooks() should return only OT books', () => {
    const component = create();

    const ot = component.getOldTestamentBooks();

    expect(Array.isArray(ot)).toBeTrue();
    expect(ot.every(b => b.testament === 'OT')).toBeTrue();
    expect(ot.map(b => b.code)).toEqual(['GEN', 'EXO', 'LEV', 'NUM']);

    // ensure it returns a *filtered* array (not the same reference as books)
    expect(ot).not.toBe(component.books as unknown as any[]);
  });

  it('getNewTestamentBooks() should return only NT books', () => {
    const component = create();

    const nt = component.getNewTestamentBooks();

    expect(Array.isArray(nt)).toBeTrue();
    expect(nt.every(b => b.testament === 'NT')).toBeTrue();
    expect(nt.map(b => b.code)).toEqual(['MAT', 'MAR', 'LUK']);
    expect(nt).not.toBe(component.books as unknown as any[]);
  });

  it('should handle empty service response gracefully', async () => {
    mockBibleApiService.getBooks.and.returnValue(Object.freeze([]));
    const component = create();

    expect(component.books.length).toBe(0);
    expect(component.getOldTestamentBooks().length).toBe(0);
    expect(component.getNewTestamentBooks().length).toBe(0);
  });

  it('filters should exclude any unexpected testament values', () => {
    const component = create();

    const ot = component.getOldTestamentBooks();
    const nt = component.getNewTestamentBooks();

    // none of the results should be the invalid 'AP' entry
    expect(ot.find(b => (b as any).testament === 'AP')).toBeUndefined();
    expect(nt.find(b => (b as any).testament === 'AP')).toBeUndefined();
  });
});

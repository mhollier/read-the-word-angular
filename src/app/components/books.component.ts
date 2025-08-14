import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BibleApiService } from '../services/bible-api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookSummary } from '../models/bible.models';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './books.component.html',
})
export class BooksComponent {
 
  private activatedRoute = inject(ActivatedRoute);
  private bibleService: BibleApiService = inject(BibleApiService);
  
  public books: ReadonlyArray<BookSummary> = this.bibleService.getBooks();

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
    });
  }

  public getOldTestamentBooks(): ReadonlyArray<BookSummary> {
    return this.books.filter(b => b.testament === 'OT');
  }

  public getNewTestamentBooks(): ReadonlyArray<BookSummary> {
    return this.books.filter(b => b.testament === 'NT');
  }
  
}

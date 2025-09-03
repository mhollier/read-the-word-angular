import { Component, inject, OnInit } from '@angular/core';
import { BibleApiService } from '../services/bible-api.service';
import { RouterLink } from '@angular/router';
import { BookSummary } from '../models/bible.models';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './books.component.html',
})
export class BooksComponent {
 
  private bibleService: BibleApiService = inject(BibleApiService);  
  books: ReadonlyArray<BookSummary> = this.bibleService.getBooks();

  getOldTestamentBooks(): ReadonlyArray<BookSummary> {
    return this.books.filter(b => b.testament === 'OT');
  }

  getNewTestamentBooks(): ReadonlyArray<BookSummary> {
    return this.books.filter(b => b.testament === 'NT');
  }
  
}

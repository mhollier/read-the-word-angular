import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BibleApiService } from '../services/bible-api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './books.component.html',
})
export class BooksComponent {
 
  private activatedRoute = inject(ActivatedRoute);
  private bibleService: BibleApiService = inject(BibleApiService);
  
  public books = this.bibleService.getBooks();

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
    });
  }
}

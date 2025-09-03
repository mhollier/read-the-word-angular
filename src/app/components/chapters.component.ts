import { Component, inject, signal } from '@angular/core';
import { BibleApiService } from '../services/bible-api.service';
import { BookSummary, Verse } from '../models/bible.models';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-chapters',
  standalone: true,
  imports: [MatExpansionModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule],
  styleUrl: './chapters.component.scss',
  templateUrl: './chapters.component.html',
})
export class ChaptersComponent {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  private bibleService: BibleApiService = inject(BibleApiService);

  readonly bibleCode = signal('WEB');
  readonly bookCode = signal('GEN');
  readonly chapterNum = signal(1);
  readonly book = signal<BookSummary | null>(null);
  readonly verses = signal<ReadonlyArray<Verse>>([]);
  readonly chapterRange = signal<number[]>([]);
  readonly isChapterPanelCollapsed = signal<boolean>(false);

  constructor() {
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe((params) => {
      this.bookCode.set(params['bookCode']);
      this.chapterNum.set(+params['chapterNum']);
      this.book.set(this.bibleService.getBook(this.bibleCode(), this.bookCode()));
      this.chapterRange.set(Array.from({ length: this.book()?.chapters ?? 0 }, (_, i) => i + 1));
      this.getChapterVerses();
    });
  }

  getChapterVerses(): void {
    this.isChapterPanelCollapsed.set(true);
    this.verses.set(this.bibleService.getChapterVerses(this.bibleCode(), this.bookCode(), this.chapterNum()));
  }

  nextChapter(): void {
    const nextNum = this.chapterNum() + 1;
    if (nextNum <= (this.book()?.chapters ?? 1)) {
      this.router.navigate(['/', 'books', this.bookCode(), nextNum]);
    }
  }

  previousChapter(): void {
    const prevNum = this.chapterNum() - 1;
    if (prevNum >= 1) {
      this.router.navigate(['/', 'books', this.bookCode(), prevNum]);
    }
  }

  navigateToChapter(selectedChapter: number): void {
    this.router.navigate(['/', 'books', this.bookCode(), selectedChapter]);
  }
}

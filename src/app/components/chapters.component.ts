import { Component, ElementRef, inject, input, numberAttribute, OnChanges, signal, SimpleChanges } from '@angular/core';
import { BibleApiService } from '../services/bible-api.service';
import { BookSummary, Verse } from '../models/bible.models';
import { Router } from '@angular/router';
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
export class ChaptersComponent implements OnChanges {
  private router = inject(Router);
  private bibleService = inject(BibleApiService);
  private elementRef = inject(ElementRef);

  bookCode = input<string>('');
  chapterNum = input(0, { transform: numberAttribute });

  readonly book = signal<BookSummary | null>(null);
  readonly chapterRange = signal<number[]>([]);
  readonly verses = signal<ReadonlyArray<Verse>>([]);

  ngOnChanges(changes: SimpleChanges): void {
     this.refresh();
  }

  refresh(): void {
    this.book.set(this.bibleService.getBook(this.bookCode()));
    this.chapterRange.set(Array.from({ length: this.book()?.chapters ?? 0 }, (_, i) => i + 1));
    this.verses.set(this.bibleService.getChapterVerses(this.bookCode(), this.chapterNum()));

    this.elementRef.nativeElement.querySelector('#verse-1')?.scrollIntoView({
      behavior: "instant",
      block: "start",
      container: "nearest"
    });
  }

  nextChapter(): void {
    const nextNum = this.chapterNum() + 1;
    if (nextNum <= (this.book()?.chapters ?? 1)) {
      this.navigateToChapter(nextNum);
    }
  }

  previousChapter(): void {
    const prevNum = this.chapterNum() - 1;
    if (prevNum >= 1) {
      this.navigateToChapter(prevNum);
    }
  }

  navigateToChapter(selectedChapter: number): void {
    this.router.navigate(['/', 'books', this.bookCode(), selectedChapter]);
  }
}

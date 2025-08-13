import { Component, inject, signal } from '@angular/core';
import { BibleApiService } from '../services/bible-api.service';
import { BibleSummary, BookSummary, Verse } from '../models/bible.models';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chapters',
  standalone: true,
  imports: [MatButtonModule],
  styleUrl: './chapters.component.scss',
  templateUrl: './chapters.component.html',
})
export class ChaptersComponent {
 
  private route = inject(ActivatedRoute);
  private bibleService: BibleApiService = inject(BibleApiService);
  
  bibleCode = signal('WEB');
  bookCode = signal('');

  bible = signal<BibleSummary | null>(null);
  book = signal<BookSummary | null>(null);
  verses = signal<ReadonlyArray<Verse>>([]);
  chapterRange = signal<number[]>([]);
  currChapterNum = signal<number>(Number(this.route.snapshot.paramMap.get('chapterNum') ?? '1'));
  isChapterPanelCollapsed = signal<boolean>(true);


  constructor() {
    this.route.params.subscribe((params) => {
      this.bookCode.set(params['bookCode']);
      this.book.set(this.bibleService.getBook(this.bibleCode(), this.bookCode()));
      this.chapterRange.set(Array.from({ length: this.book()?.chapters ?? 0 }, (_, i) => i + 1));
      this.fetchVerses(this.currChapterNum())
    });
  }

  private fetchVerses(chapterNum: number): void {
    this.verses.set(this.bibleService.getChapterVerses(this.bibleCode(), this.bookCode(), chapterNum));
  }

  getChapterVerses(chapterNum: number) {
    this.currChapterNum.set(chapterNum);
    this.isChapterPanelCollapsed.set(true);
    // emulate $anchorScroll('chapterTitle'):
    queueMicrotask(() => document.getElementById('chapterTitle')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    this.fetchVerses(chapterNum);
  }


  nextChapter() {
    const nextNum = this.currChapterNum() + 1;
    if (nextNum <= (this.book()?.chapters ?? 1)) this.getChapterVerses(nextNum);
  }

  previousChapter() {
    const prevNum = this.currChapterNum() - 1;
    if (prevNum >= 1) this.getChapterVerses(prevNum);
  }

  toggleChaptersDisplay() {
    this.isChapterPanelCollapsed.set(!this.isChapterPanelCollapsed());
  }
}

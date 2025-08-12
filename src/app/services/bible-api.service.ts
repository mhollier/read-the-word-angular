import { Injectable } from '@angular/core';
import { BibleFull, BibleSummary, BOOKS, BookSummary, RandomVerse, Verse } from '../models/bible.models';
import { WorldEnglishBibleJson } from '../bibles/web';

@Injectable({ providedIn: 'root' })
export class BibleApiService {
  private bibles: Array<BibleFull> = [];
  private summaries: Array<BibleSummary> = [];
  private bookSummaries: Array<BookSummary> = [];

  constructor() {
    const web: BibleFull = JSON.parse(WorldEnglishBibleJson);
    this.bibles.push(web);
    this.summaries.push(web.info);
    this.bookSummaries = BOOKS;
  }

  getBibles(): BibleSummary[] {
    return this.summaries;
  }

  getBible(bibleCode: string): BibleFull {
    return this.bibles[0];
  }

  getBooks(): ReadonlyArray<BookSummary> {
    return this.bookSummaries;
  }

  getBook(bibleCode: string, bookCode: string): BookSummary | null {
    return this.bookSummaries.find(b => b.code == bookCode) ?? null;
  }

  getChapterVerses(bibleCode: string, bookCode: string, chapterNum: number): ReadonlyArray<Verse> {
    const bible = this.bibles.find(b => b.info.code === bibleCode);
    return bible?.verses.filter(v => v.book === bookCode && v.chapter === chapterNum) ?? [];
  }
}

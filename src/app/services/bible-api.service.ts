import { Injectable } from '@angular/core';
import { BibleFull, BibleSummary, BOOKS, BookSummary, RandomVerse, Verse } from '../models/bible.models';
import { WorldEnglishBibleJson } from '../bibles/web';

@Injectable({ providedIn: 'root' })
export class BibleApiService {
  private static readonly MAX_VERSE_NUM = 31000;

  private bible: BibleFull;
  private summaries: Array<BibleSummary> = [];
  private bookSummaries: Array<BookSummary> = [];

  constructor() {
    this.bible = JSON.parse(WorldEnglishBibleJson);
    this.summaries.push(this.bible.info);
    this.bookSummaries = BOOKS;
  }

  getBooks(): ReadonlyArray<BookSummary> {
    return this.bookSummaries;
  }

  getBook(bookCode: string): BookSummary | null {
    return this.bookSummaries.find(b => b.code == bookCode) ?? null;
  }

  getChapterVerses(bookCode: string, chapterNum: number): ReadonlyArray<Verse> {
    return this.bible.verses.filter(v => v.book === bookCode && v.chapter === chapterNum) ?? [];
  }

  getVerseCount(bookCode: string, chapterNum: number): number {
    return this.bible.verses.filter(v => v.book === bookCode && v.chapter === chapterNum).length ?? 0;
  }

  getRandomVerse(): RandomVerse {
    const index: number = Math.floor(Math.random() * BibleApiService.MAX_VERSE_NUM);
    const verse = this.bible.verses[index];
    return {
      book: verse.book,
      chapter: verse.chapter,
      start: verse.verse,
      end: verse.verse,
      verseText: verse.verseText
    };
  }
}

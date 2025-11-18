import { Component, computed, inject, signal } from '@angular/core';
import { BibleApiService } from '../services/bible-api.service';
import { RandomVerse } from '../models/bible.models';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-random-verse',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule],
  styleUrl: './random.component.scss',
  templateUrl: './random.component.html',
})
export class RandomComponent { 
  private router = inject(Router);
  private bibleService = inject(BibleApiService);

  readonly randomVerse = signal<RandomVerse>(this.bibleService.getRandomVerse());
  readonly verseReference = computed<string>(() => {
    const v = this.randomVerse();
    const b = this.bibleService.getBook(v.book);
    return `${b?.title} ${v.chapter}:${v.start}`;
  });

  refresh(): void {
    this.randomVerse.set(this.bibleService.getRandomVerse());
  }

  navigateToChapter(): void {
    this.router.navigate(['/', 'books', this.randomVerse().book, this.randomVerse().chapter]);
  }
}

import { Routes } from '@angular/router';
import { BiblesComponent } from './components/bibles.component';
import { BooksComponent } from './components/books.component';
import { ChaptersComponent } from './components/chapters.component';

export const routes: Routes = [
  { path: '', redirectTo: 'bibles', pathMatch: 'full' },
  { path: 'bibles', component: BiblesComponent },
  { path: ':bibleCode/books', component: BooksComponent },
  { path: ':bibleCode/books/:bookCode/:chapterNum', component: ChaptersComponent },
  { path: ':bibleCode/books/:bookCode', component: ChaptersComponent }, // default to chapter 1
  // { path: 'random', component: RandomComponent },
  { path: '**', redirectTo: 'bibles' }
];


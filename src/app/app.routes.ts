import { Routes } from '@angular/router';
import { BooksComponent } from './components/books.component';
import { ChaptersComponent } from './components/chapters.component';

export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'books/:bookCode/:chapterNum', component: ChaptersComponent },
  { path: 'books/:bookCode', component: ChaptersComponent }, // default to chapter 1
  // { path: 'random', component: RandomComponent },
  { path: '**', redirectTo: 'bibles' }
];


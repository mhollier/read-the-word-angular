import { Routes } from '@angular/router';
import { BooksComponent } from './components/books.component';
import { ChaptersComponent } from './components/chapters.component';

export const routes: Routes = [
  { path: 'books/:bookCode/:chapterNum', component: ChaptersComponent },
  { path: 'books/:bookCode', redirectTo: 'books/:bookCode/1', pathMatch: 'full' }, 
  { path: 'books', component: BooksComponent },
  // { path: 'random', component: RandomComponent },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  // { path: '**', redirectTo: 'books' }
];


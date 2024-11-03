import { Routes } from '@angular/router';
import { NewsFormComponent } from './components/news-form/news-form.component';
import { NewsListComponent } from './components/news-list/news-list.component';

export const routes: Routes = [
  { path: 'news', component: NewsListComponent },
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  { path: 'news/new', component: NewsFormComponent },
  { path: 'news/edit/:id', component: NewsFormComponent }
];

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { NewsListComponent } from './app/components/news-list/news-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(NewsListComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()), provideAnimationsAsync()
  ],
});

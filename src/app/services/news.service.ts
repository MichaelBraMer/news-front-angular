import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface News {
  id: number;
  title: string;
  paragraph: string;
}

interface addNew {
  title: string;
  paragraph: string;
}

const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'http://localhost:8080/news'; // Cambia esta URL por la de tu API

  constructor(private httpClient:HttpClient) { }

  getNews(): Observable<News []> {
    return this.httpClient.get<News []>(this.apiUrl, {headers})
  }

  getNewsById(id: number): Observable<News> {
    return this.httpClient.get<News>(`${this.apiUrl}/${id}`, {headers});
  }

  addNews(news: addNew): Observable<News> {
    return this.httpClient.post<News>(this.apiUrl, JSON.stringify(news), {headers})
  }

  updateNews(id: number | string, news: addNew): Observable<News> {
    return this.httpClient.put<News>(`${this.apiUrl}/${id}`, JSON.stringify(news), {headers})
  }

  deleteNews(id: number | string): Observable<News> {
    return this.httpClient.delete<News>(`${this.apiUrl}/${id}`, {headers})
  }
}

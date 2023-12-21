import { Injectable } from '@angular/core';
import { IPost } from './create-article/create-article.component';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:5000/getArticle'

  constructor(private http: HttpClient) { }

  getArticles() {
    return this.http.get<IPost[]>(this.apiUrl)
  }
}

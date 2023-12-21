import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Themeservice } from '../theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule, FormsModule, MatButtonModule, CommonModule],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss'
})
export class CreateArticleComponent {
  constructor(private http: HttpClient, public themeService: Themeservice){}
  title = ''
  description = ''
  img = ''
  navbarTitle = "Home"
  link = '/home'

  addArticle() {
    const article: IPost = {title: this.title, description: this.description, img: this.img}

    this.http.post<any>("http://127.0.0.1:5000/addArticle", article)
    .subscribe((response) => {
      console.log(response);
    })
  }
}

export interface IPost {
  title: string 
  description: string 
  img: string | undefined
  id?: number
}

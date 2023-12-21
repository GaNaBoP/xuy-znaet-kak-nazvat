import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { IPost } from '../create-article/create-article.component';
import { ArticleService } from '../article.service';
import { CommonModule } from '@angular/common'; 
import { ArticleComponent } from '../article/article.component';
import { Router, RouterLink } from '@angular/router';
import { Themeservice } from '../theme.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule, CommonModule, ArticleComponent, RouterLink, NzInputModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private articleService: ArticleService, private router: Router, public themeService: Themeservice) {}
  navbarTitle = 'Add Article'
  link = '/create'
  linkToPost = '/article/'
  filter = ''
  articles: IPost[] = []
  errorMessage: null | IError = {
    name: '',
    message: ''
  }

  updateArticles(): void {
    this.articleService.getArticles().subscribe(
      (res) => {
        this.articles = res
        this.errorMessage = null
      },
      (err) => {
        this.errorMessage = err
        setTimeout(() => {
          this.errorMessage = null
        }, 10000)
      }
    );
  }

  relocate(id: any): void {
    this.router.navigate([`/article/${id}`])
  }

  ngOnInit(): void {
    this.errorMessage = null
    this.updateArticles()
  }
}
interface IError {
  name: string
  message: string
}
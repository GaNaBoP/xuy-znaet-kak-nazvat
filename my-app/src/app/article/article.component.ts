import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IPost } from '../create-article/create-article.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Themeservice } from '../theme.service';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [HttpClientModule, NavbarComponent, CommonModule, NzButtonModule, FormsModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient, public themeService: Themeservice) { }
  theme = this.themeService.getTheme()
  commentText: string = ''
  navbarTitle = "Home"
  link = '/home'
  author: string | null = localStorage.getItem("user")
  id: string | null = ''
  comments: any = []
  post: IPost = {
    title: '',
    description: '',
    img: ''
  }
  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getArticles(this.id)
    this.getComments(this.id)
  }

  addComment() {
    const comment: IComment = {text: this.commentText, id: this.id, author: this.author}

    return this.http.post<IComment>("http://127.0.0.1:5000/addComment", comment)
    .subscribe((response) => {
      this.commentText = ''
      console.log(response);
    })
  }

  getComments(id: any) {
    return this.http.get<IComment>(`http://localhost:5000/getComments/${id}`)
    .subscribe((res) => {
      this.comments = res
      console.log(this.comments)
    }, (err) => {
      console.log(err)
    })
  }

  getArticles(id: any) {
    return this.http.get<IPost>(`http://localhost:5000/getOneArticle/${id}`)
    .subscribe((res) => {
      this.post = res
    }, (err) => {
      console.log(err)
    })
  }
}

interface IComment {
  text: string,
  id: string | null,
  author: string | null
}
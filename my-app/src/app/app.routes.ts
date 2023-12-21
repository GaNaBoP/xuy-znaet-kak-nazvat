import { Routes } from '@angular/router';
import { AuthcontrollerComponent } from './authcontroller/authcontroller.component';
import { HomeComponent } from './home/home.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ArticleComponent } from './article/article.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
  {path: "create", component: CreateArticleComponent, canActivate: [AuthGuard]},
  {path: "", component: AuthcontrollerComponent},
  {path: 'article/:id', component: ArticleComponent, canActivate: [AuthGuard]}
];

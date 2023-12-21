import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Themeservice } from '../theme.service';

@Component({
  selector: 'app-authcontroller',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NzAlertModule, CommonModule],
  templateUrl: './authcontroller.component.html',
  styleUrl: './authcontroller.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', animate('300ms ease-in-out')),
    ]),
  ],
})

export class AuthcontrollerComponent {
  constructor(private http: HttpClient, private router: Router, public themeService: Themeservice){}
  login: string = ''
  password: string = ''
  errorMessage: string | null = null

  hideError() {
    setTimeout(() => {
      this.errorMessage = null
    }, 1300)
  }

  checkError() {
    if (!this.login) {
      this.errorMessage = 'Логин не может быть пустым';
      this.hideError()
      return
    } else if (!this.password) {
      this.errorMessage = 'Пароль не может быть пустым';
      this.hideError()
      return
    } 
  }

  register() {
    this.checkError()
    const user: IUser = {login: this.login, password: this.password}

    this.http.post<any>("http://127.0.0.1:5000/submit", user)
    .subscribe((response) => {
      console.log(response);
    })
  }

  auth() {
    this.checkError()
    const user: IUser = {login: this.login, password: this.password}

    this.http.post<any>("http://127.0.0.1:5000/login", user)
    .subscribe((response) => {
      console.log(response);
      if (response.message === "User logged in successfully") {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', this.login);
        this.router.navigate(['/home'])
      }
    })
  }
}

interface IUser {
  login: string
  password: string
}

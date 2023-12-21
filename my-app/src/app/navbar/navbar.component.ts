import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Themeservice } from '../theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(public themeService: Themeservice) { }
  setTheme(): void {
    this.themeService.setTheme();
  }
  logout() {
    localStorage.setItem('isLoggedIn', 'false');
  }
  @Input() navbarTitle: string = ''
  @Input() link: string = ''
}

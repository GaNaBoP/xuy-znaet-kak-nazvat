import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class Themeservice {
  isDark: boolean = false

  getTheme() {
    return this.isDark
  }

  setTheme(): void {
    this.isDark = !this.isDark
  }
}
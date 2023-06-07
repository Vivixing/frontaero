import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  private userId: number | null = null;

  constructor() { }

  login(userId: number) {
    this.isLoggedIn = true;
    this.userId = userId;
  }

  logout() {
    this.isLoggedIn = false;
    this.userId = null;
  }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  getUserId(): number | null {
    return this.userId;
  }
}

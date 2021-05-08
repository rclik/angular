import { Injectable } from '@angular/core';
import { User } from '../login/user';

@Injectable()
export class AccountService {
  private LOCAL_STORAGE_NAME: string = "LOGGED_IN_USER";
  private loggedIn: boolean = false;

  constructor() { }

  login(user: User) {
    if (user.name === "rahman" && user.password === "1234") {
      localStorage.setItem(this.LOCAL_STORAGE_NAME, user.name);
      this.loggedIn = true;
      return true;
    }

    localStorage.setItem(this.LOCAL_STORAGE_NAME, "");
    this.loggedIn = false;

    return false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { User } from '../user';

@Component({
  selector: 'app-login-classic-form',
  templateUrl: './login-classic-form.component.html',
  styleUrls: ['./login-classic-form.component.css']
})
export class LoginClassicFormComponent implements OnInit {

  model: User = new User();

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login(loginForm: NgForm) {
    if (this.accountService.login(this.model)) {
      this.router.navigate(["products"]);
    } else {
      console.error("[LoginClassicFormComponent.login] Username or password is not valid.");

    }
  }

  logOut(): void {
    this.accountService.logout();
  }

}

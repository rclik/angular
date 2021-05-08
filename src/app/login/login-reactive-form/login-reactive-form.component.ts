import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { User } from '../user';

@Component({
  selector: 'app-login-reactive-form',
  templateUrl: './login-reactive-form.component.html',
  styleUrls: ['./login-reactive-form.component.css'],
  providers: [FormBuilder]
})
export class LoginReactiveFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router) { }

  loginForm!: FormGroup;
  model: User = new User();

  ngOnInit(): void {
    console.log("[LoginReactiveFormComponent.ngOnInit]");
    this.createLoginForm();
  }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group(
      {
        userName: ["", Validators.required],
        password: ["", Validators.required],
      }
    );
  }

  login() {
    this.model = Object.assign({}, this.loginForm.value);
    // console.log("[LoginReactiveFormComponent.login] form: " + JSON.stringify(this.model));
    if (this.accountService.login(this.model)) {
      this.router.navigate(["products"]);
    } else {
      console.error("[LoginReactiveFormComponent.login()] Username or password is not valid");
    }
  }

}

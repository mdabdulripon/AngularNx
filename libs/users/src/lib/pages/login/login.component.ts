import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  hidePassword = false;
  form!: FormGroup;
  isSubmitted = false;
  errorMessage!: string;

  get loginForm() {
    return this.form.controls;
  }

  constructor(
    private formBuilder: FormBuilder, 
    private usersService: UsersService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    ) { }

  ngOnInit(): void {
    console.log(`users login component`)
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: ['',  [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePassword() {
		this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;

    const model = {
      email: this.loginForm['email'].value,
      password: this.loginForm['password'].value
    }
    this.authService.login(model.email, model.password).subscribe((user) => {
      console.log(user);
      // TODO: store token in cookies.
      if (user) {
        this.localStorageService.setToken(user.token!);
      }
    }, (error: HttpErrorResponse) => {
      console.log(error);
      // this.errorMessage = error.message;
    })
  }
}

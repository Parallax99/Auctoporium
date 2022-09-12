import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from 'src/app/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private session: SessionService,
    private route: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}
  login() {
    this.session.loginApi(this.loginForm.value).subscribe(
      (resp) => {
        // console.log(this.authToken);
        localStorage.setItem('authToken', resp.msg);
        localStorage.setItem('user',JSON.stringify(resp.data))
        console.log(resp.msg)
        this.toastr.success('Logged In Successfully');
        this.route.navigateByUrl('/home');
      },
      (err) => {
        console.log(err);
        this.toastr.error(
          'Please check Your Email & Password',
          'Invalid Credentials'
        );
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from 'src/app/session.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignUpComponent {
  userForm: FormGroup;
  constructor(
    private route: Router,
    private session: SessionService,
    private toastr: ToastrService
  ) {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.strongPassword,
      ]),
    });
  }

  strongPassword(password: AbstractControl): ValidationErrors | null {
    let isUpper = false;
    let isLower = false;
    let isSpecial = false;
    let isDigit = false;
    let passwordValue = password.value as string;

    if (passwordValue.length < 8) return null;

    for (let i = 0; i < passwordValue.length; i++) {
      if (passwordValue.charAt(i) >= 'A' && passwordValue.charAt(i) <= 'Z') {
        isUpper = true;
      } else if (
        passwordValue.charAt(i) >= 'a' &&
        passwordValue.charAt(i) <= 'z'
      ) {
        isLower = true;
      } else if (
        passwordValue.charAt(i) == '$' ||
        passwordValue.charAt(i) == '#' ||
        passwordValue.charAt(i) == '@'
      ) {
        isSpecial = true;
      } else if (
        passwordValue.charAt(i) >= '0' &&
        passwordValue.charAt(i) <= '9'
      ) {
        isDigit = true;
      }
    }

    if (isLower && isUpper && isSpecial && isDigit) return null;
    else return { strongPassword: true };
  }
  signUp() {
    this.session.signUpApi(this.userForm.value).subscribe(
      (resp) => {
        this.toastr.success('Signed In Successfully ');
        this.route.navigateByUrl('/login');
      },
      (err) => {
        this.toastr.error('Email Already Exists', 'Invalid Email');
      }
    );
  }
}

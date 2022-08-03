import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css'],
})
export class LoginLayoutComponent implements OnInit {
  loginFrm = this.fb.group({
    Email: ['', [Validators.email, Validators.required]],
    Password: ['', [Validators.required]],
  });
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {}

  tryGoogleLogin() {
    this.authService.signinGmail().then((res) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Login successful',
        showConfirmButton: false,
        timer: 1500,
      });
      location.href = '/admin/home';
    });
  }
  tryEmailPasswordLogin() {
    var email = this.loginFrm.controls['Email'].value;
    var password = this.loginFrm.controls['Password'].value;
    this.authService
      .signinFirebase(email, password)
      .then((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login successful',
          showConfirmButton: false,
          timer: 1500,
        });
        location.href = '/admin/home';
      })
      .catch((err) => {
        Swal.fire(err.message, '', 'error');
      });
  }
}

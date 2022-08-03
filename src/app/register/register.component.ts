import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerFrm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(18)],
    ],
  });
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}
  register() {
    var email = this.registerFrm.controls.email.value;
    var password = this.registerFrm.controls.password.value;
    this.authService
      .signUp(email, password)
      .then((email) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Register successful',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire(err.message, '', 'error');
      });
  }
}

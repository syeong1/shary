import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  registerForm: FormGroup;

  password: String;
  confirmPassword: String;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {


    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6)]),
      nickname: new FormControl('', Validators.required)
    });

  }

  // get password(): any { return this.registerForm.get('password'); }
  // get confirmPassword(): any { return this.registerForm.get('confirmPassword'); }

  onSubmit() {
    if (this.password == this.confirmPassword) {
      this.authService.register(this.registerForm.value).subscribe(res => {
        this.authService.login(this.registerForm.value).subscribe();
        this.router.navigate(['']);
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators,FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, public alertController: AlertController,
    private router: Router) { }

  ngOnInit() {


    this.registerForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
      nickname: new FormControl()
   });


    // this.registerForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   confirmPassword: ['', [Validators.required, Validators.minLength(6)]], 
    //   nickname: ['', [Validators.required, Validators.composeAsync]]
    // });
  }

  get password(): any { return this.registerForm.get('password'); }
  get confirmPassword(): any { return this.registerForm.get('confirmPassword'); }

  onSubmit() {
    if (this.password.value == this.confirmPassword.value) {
      this.authService.register(this.registerForm.value).subscribe(res => {
        this.authService.login(this.registerForm.value).subscribe();
        this.router.navigate(['']);
      });
    }
    else {
      this.presentAlert('비밀번호가 일치하지 않습니다.');
    }
  }
  async presentAlert(text) {
    const toast = await this.alertController.create({
      message: text,
      buttons: ['OK']
    });
    toast.present();
  }
}

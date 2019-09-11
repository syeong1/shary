import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/image.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {

  user: any;
  profileForm: FormGroup;


  constructor(private userService: UserService, private imageService: ImageService, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.profileForm = new FormGroup({
      nickname: new FormControl('')
    })
    this.getUserProfile();
    this.imageService.images = [];
    this.imageService.profile = 'http://localhost/api/images/' + this.authService.user.id;

  }

  onSubmit() {
    this.userService.updateNickname(this.profileForm.value).subscribe(result => {
      console.log('결과', result);
    });
  }

  getUserProfile() {
    this.userService.getProfile().subscribe(data => {
      console.log('mypage data : ', data);
      this.user = data;
    })
  }
  uploadprofile() {
    this.imageService.selectProfile().then(() => {
    });
  }


}

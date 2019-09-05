import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.page.html',
  styleUrls: ['./mypage.page.scss'],
})
export class MypagePage implements OnInit {

  user: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile(){
    this.userService.getProfile().subscribe(data => {
      console.log('mypage data : ', data);
      this.user = data;
    })
  }

}

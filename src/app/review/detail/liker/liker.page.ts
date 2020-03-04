import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-liker',
  templateUrl: './liker.page.html',
  styleUrls: ['./liker.page.scss'],
})
export class LikerPage implements OnInit {

  @Input("reivewId") reivewId;

  reviewId: string;
  data = null;


  constructor(private userService: UserService, private reviewService: ReviewService, private activatedRoute: ActivatedRoute, private router: Router, private modalController: ModalController) { }

  ngOnInit() {
    console.log('음악 리뷰북 id : ', this.reviewId);
    this.getReviewDetail();
  }

  ionViewWillEnter() {
    this.getReviewDetail();
  }

  getReviewDetail() {
    this.reviewService.getReviewDetail('music', this.reviewId).subscribe(data => {
      console.log('*** reviewService.getReviewDetail 요청 때 reviewid : ', this.reviewId);
      console.log('받아온 Review data', data);
      console.log("data[liker]", data['liker']);
      this.data = data;
    })
  }

  back() {
    this.modalController.dismiss();
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { ModalController, AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { LikerPage } from '../liker/liker.page';

@Component({
  selector: 'app-music-detail',
  templateUrl: './music-detail.page.html',
  styleUrls: ['./music-detail.page.scss'],
})
export class MusicDetailPage implements OnInit {

  reviewId: string;
  data = null;
  likeState: boolean = false;
  likeCnt: number;
  writer: boolean = true;
  user: string;

  constructor(private userService: UserService, private reviewService: ReviewService, private activatedRoute: ActivatedRoute, private router: Router, private modalController: ModalController, public alertController: AlertController, private socialSharing: SocialSharing) {
  }

  ngOnInit() {
    this.reviewId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('음악 리뷰북 id : ', this.reviewId);
    this.getUserInfo();
    this.getReviewDetail();
  }

  ionViewWillEnter() {
    this.getReviewDetail();
    this.getLike();
  }

  getUserInfo() {
    this.userService.getProfile().subscribe(user => {
      this.user = user['id'];
    });
  }
  getReviewDetail() {
    this.reviewService.getReviewDetail('music', this.reviewId).subscribe(data => {
      console.log('*** reviewService.getReviewDetail 요청 때 reviewid : ', this.reviewId);
      console.log('받아온 Review data', data);
      console.log("### this.user", this.user);
      console.log("data[writer]", data['writer']);
      this.data = data;
      this.likeCnt = data['likeCnt'];
      // 현재 로그인한 유저와 글쓴이가 다를 경우 writer false로 변경
      if (this.user != data['writer']) this.writer = false;
    })
  }

  editReview() {
    this.router.navigate(['music/edit', this.reviewId]);
  }


  async deleteReview() {
    const alert = await this.alertController.create({
      header: '리뷰 삭제',
      message: '삭제하시겠습니까?',
      buttons: [
        {
          text: '취소',
          role: 'cancel',
          handler: () => {
            console.log('삭제 취소');
          }
        }, {
          text: '확인',
          handler: () => {
            console.log('삭제 확인');
            this.reviewService.deleteReview('music', this.reviewId).subscribe(data => {
              // 이동할 리뷰북 리스트 아이디
              let reviewbookId = data['reviewbook']
              this.router.navigate(['music/list', reviewbookId]);
            })
          }
        }
      ]
    });

    await alert.present();
  }

  getLike() {
    this.reviewService.getLike(this.reviewId).subscribe(result => {
      console.log('좋아요 상태', result);
      this.likeState = result['like'];
    })
  }

  addLike() {
    this.reviewService.addLike(this.reviewId).subscribe(data => {
      console.log('좋아요 누른 결과', data);
      this.likeState = true;
      this.likeCnt += 1;
    })
  }
  
  cancelLike() {
    this.reviewService.cancelLike(this.reviewId).subscribe(data => {
      console.log('좋아요 취소 결과', data);
      this.likeState = false;
      this.likeCnt -= 1;
    })
  }

  // 좋아요 누른 사람 리스트 모달 페이지 
  async openLikerModal() {
    let modal = await this.modalController.create({
      component: LikerPage,
      componentProps: { reviewId: this.reviewId }
    })


    return await modal.present();
  }

  // 태그 검색
  searchTag(item) {
    console.log('검색할 태그', item);
    this.router.navigate(['main-tabs/search/tag', item]);
  }

  async shareReview() {
    const alert = await this.alertController.create({
      header: '공유하기',
      message: '스포일러 주의! 공유내용에 감상평을 포함할까요?',
      buttons: [
        {
          text: '포함하기',
          handler: () => {
            this.socialShare(`♬ ${this.data.trackName} - ${this.data.artistName} ♪ \r\n\r\n ★ ${this.data.rating}.0\r\n\r\n\r\n :: 감상평 :: \r\n${this.data.review}`, `${this.data.artworkUrl100}`);
          }
        },
        {
          text: '포함하지 않기',
          handler: () => {
            this.socialShare(`♬ ${this.data.trackName} - ${this.data.artistName} ♪ \r\n\r\n ★ ${this.data.rating}.0`, `${this.data.description}`);
            console.log('포함하지 않기')
          }
        },
        {
          text: '취소',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            console.log('Confirm Cancel: 취소');
          }
        }

      ]
    });
    await alert.present();
  }

  socialShare(message, image) {
    this.socialSharing.share(message, null, [image]).then((res) => {
      console.log('res', res);
    }).catch(e => {
      console.log('e', e);
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MusicApiPage } from './../../../search/music-api/music-api.page';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {

  reviewForm: FormGroup;
  music: Object;
  nowDate: String = new Date().toISOString();
  reviewbookId: string = null;
  reviewId: string = null;
  titleText: string = '새 리뷰 작성';

  constructor(private modalController: ModalController, private reviewService: ReviewService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      reviewbook: new FormControl(''),
      trackName: new FormControl('', [Validators.required]),
      artistName: new FormControl(''),
      collectionName: new FormControl(''),
      artworkUrl100: new FormControl(''),
      primaryGenreName: new FormControl(''),
      releaseDate: new FormControl(''),
      listeningDate: new FormControl(''),
      image: new FormControl(''),
      review: new FormControl(''),
      tags: new FormControl(''),
      rating: new FormControl('')
    })
    this.reviewbookId = this.activatedRoute.snapshot.paramMap.get('reviewbook_id');
    this.reviewId = this.activatedRoute.snapshot.paramMap.get('review_id');

    // 새 리뷰 작성 시 필요한 reviewbook_id
    console.log('music write page로 넘어온 reviewbook_id : ' + this.reviewbookId);

    // 리뷰 수정 시 detail 로딩 및 title 설정
    if (this.reviewId !== null) {
      this.loadDetail();
      this.titleText = "리뷰 수정";
    }
  }

  onSubmit() {

    // reviewbook Formcontrol value 설정
    this.reviewForm.controls['reviewbook'].setValue(this.reviewbookId, { onlyself: true });

    // 새 리뷰 작성 시
    if (this.reviewId === null) {
      this.reviewService.writeReview('music', this.reviewForm.value).subscribe(res => {
        console.log("입력한 reviewForm : ", this.reviewForm);
        console.log("새 리뷰 등록 결과 : ", res);
        // 리뷰북 페이지로 이동
        this.router.navigate(['music/list', this.reviewbookId]);
      })
    }

    //리뷰 수정 시
    else {
      this.reviewService.editReview('music', this.reviewId, this.reviewForm.value).subscribe(res => {
        console.log("입력한 reviewForm : ", this.reviewForm);
        console.log("리뷰 수정 등록 결과 : ", res);
        // 리뷰 디테일 페이지로 이동
        this.router.navigate(['music/detail', this.reviewId]);
      })
    }
  }

  // 리뷰 수정 시 디테일 가져오기
  loadDetail() {
    this.reviewService.getReviewDetail('music', this.reviewId).subscribe(data => {
      console.log('reviewService 요청할 때 reivew_id : ', this.reviewId);
      console.log('받아온 Review data', data);
      this.music = data;
      this.reviewbookId = data['reviewbook'];
      console.log("!!! loadDetail !!!");
      console.log(this.reviewbookId);
    })
  }


  async openSearchMusicModal() {
    const modal = await this.modalController.create({
      component: MusicApiPage
    })

    modal.onDidDismiss()
      .then((data) => {
        console.log(data['data']);
        console.log(typeof data['data']);

        this.music = data['data'];
      })
    return await modal.present();
  };

}

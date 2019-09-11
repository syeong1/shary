import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TvService } from 'src/app/services/tv.service';
import { ModalController } from '@ionic/angular';
import { TvApiPage } from 'src/app/search/tv-api/tv-api.page';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.page.html',
  styleUrls: ['./tv.page.scss'],
})
export class TvPage implements OnInit {
  reviewbookId: string;
  reviewForm: FormGroup;
  tv = {};
  nowdate: String = new Date().toISOString();
  reviewId: string = null;
  titleText: string = '새 리뷰 작성';


  constructor(private activateRoute: ActivatedRoute, private tvService: TvService, private router: Router, private modalController: ModalController, private fb: FormBuilder, private reviewService: ReviewService) { }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      writer: new FormControl(''),
      reviewbook: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      releaseDate: new FormControl(''),
      broadcaster: new FormControl(''),
      overview: new FormControl(''),
      genre: new FormControl(''),
      watchStartDate: new FormControl(''),
      watchEndDate: new FormControl(''),
      posterPath: new FormControl(''),
      rating: new FormControl(''),
      state: new FormControl(''),
      review: new FormControl(''),
      episodes: this.fb.array([this.initEpisodesFields()]),
      tags: new FormControl(''),

    })
    this.reviewbookId=this.activateRoute.snapshot.paramMap.get('reviewbook_id');
    this.reviewId = this.activateRoute.snapshot.paramMap.get('review_id');
    // 새 리뷰 작성 시 필요한 reviewbook_id
    console.log('tv write page로 넘어온 reviewbook_id : ' + this.reviewbookId);

    // 리뷰 수정 시 detail 로딩 및 title 설정
    if (this.reviewId !== null) {
      this.loadDetail();
      this.titleText = "리뷰 수정";
    }
  }
  //에피소드 초기화
  initEpisodesFields(): FormGroup {
    return this.fb.group({content: ['']})
  }
  //에피소드 불러오기
  loadEpisodeFields(episode): FormGroup {
    return this.fb.group({content: [episode]})
  }
  //에피소드 array 불러오기
  setEpisodesFields():void {
    const control = <FormArray>this.reviewForm.controls.episodes;
    for(let episode of this.tv['episodes']){
      control.push(this.loadEpisodeFields(episode));
    }
  } 

  //에피소드 추가
  addNewInputField(): void {
    const control = <FormArray>this.reviewForm.controls.episodes;
    control.push(this.initEpisodesFields());
  }
  //에피소드 삭제
  removeInputField(i: number): void {
    const control = <FormArray>this.reviewForm.controls.episodes;
    control.removeAt(i);
  }
  manage(val: any): void {
    console.dir(val);
  }



  onSubmit() {
    // reviewbook Formcontrol value 설정
    this.reviewForm.controls['reviewbook'].setValue(this.reviewbookId, { onlyself: true });

    // 새 리뷰 작성 시
    if (this.reviewId === null) {
      this.reviewService.writeReview('tv', this.reviewForm.value).subscribe(res => {
        console.log("입력한 reviewForm : ", this.reviewForm);
        console.log("새 리뷰 등록 결과 : ", res);
        // 리뷰북 페이지로 이동
        this.router.navigate(['tv/list', this.reviewbookId]);
      })
    }

    //리뷰 수정 시
    else {
      this.reviewService.editReview('tv', this.reviewId, this.reviewForm.value).subscribe(res => {
        console.log("입력한 reviewForm : ", this.reviewForm);
        console.log("리뷰 수정 등록 결과 : ", res);
        // 리뷰 디테일 페이지로 이동
        this.router.navigate(['tv/detail', this.reviewId]);
      })
    }
  }
  // 리뷰 수정 시 디테일 가져오기
  loadDetail() {
    this.reviewService.getReviewDetail('tv', this.reviewId).subscribe(data => {
      console.log('reviewService 요청할 때 reivew_id : ', this.reviewId);
      console.log('받아온 Review data', data);
      this.tv = data;
      this.reviewbookId = data['reviewbook'];
      console.log(this.reviewbookId);
      this.setEpisodesFields();
    })
  }
  async openSearchTvModal() {
    const modal = await this.modalController.create({
      component: TvApiPage,
    });
    modal.onDidDismiss()
      .then((data) => {

        if (data['data'] != undefined) {
          this.tv = data['data'];
          this.tv['posterPath'] = this.tv['poster_path'];
          this.tv['title'] = this.tv['name'];
          this.tv['genre_ids'] = this.tv['genre_ids'][0];
        }



      })
    return await modal.present();
  };


}

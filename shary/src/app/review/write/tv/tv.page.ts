import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TvService } from 'src/app/services/tv.service';
import { ModalController } from '@ionic/angular';
import { TvApiPage } from 'src/app/search/tv-api/tv-api.page';

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


  constructor(private activatedRoute: ActivatedRoute, private tvService: TvService, private router: Router, private modalController: ModalController, private fb: FormBuilder) { }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      writer: new FormControl(''),
      reviewList: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      releaseDate: new FormControl(''),
      braodcaster: new FormControl(''),
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
    this.reviewbookId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('book write page로 넘어온 리뷰북 아이디 : ' + this.reviewbookId);
    this.reviewForm.controls['reviewList'].setValue(this.reviewbookId, { onlyself: true });
  }
  //에피소드 초기화
  initEpisodesFields(): FormGroup {
    return this.fb.group({
      content: ['', Validators.required]
    })
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
  manage(val : any) : void
   {
      console.dir(val);
   }



  onSubmit() {
    console.log('reviewForm',this.reviewForm.value);
    this.tvService.writeReview(this.reviewForm.value).subscribe(res => {
     
      console.log(res);
      this.router.navigate(['tv/list', this.reviewbookId]);
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
          this.tv['genre_ids'] = this.tv['genre_ids'][0];
        }



      })
    return await modal.present();
  };


}

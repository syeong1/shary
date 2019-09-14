import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieApiPage } from 'src/app/search/movie-api/movie-api.page';
import { ReviewService } from 'src/app/services/review.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  reviewForm: FormGroup;
  movie = {};
  nowDate: String = new Date().toISOString();
  reviewbookId: string = null;
  reviewId: string = null;
  titleText: string = '새 리뷰 작성';


  constructor(private activateRoute: ActivatedRoute, private movieService: MovieService, private modalController: ModalController, private router: Router, private reviewService: ReviewService) { }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      writer: new FormControl(''),
      reviewlist: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      releaseDate: new FormControl(''),
      director: new FormControl(''),
      overview: new FormControl(''),
      genre: new FormControl(''),
      watchDate: new FormControl(''),
      posterPath: new FormControl(''),
      rating: new FormControl(''),
      famousLine: new FormControl(''),
      review: new FormControl(''),
      tags: new FormControl(''),

    })
    this.reviewbookId = this.activateRoute.snapshot.paramMap.get('reviewbook_id');
    this.reviewId = this.activateRoute.snapshot.paramMap.get('review_id');
    // 새 리뷰 작성 시 필요한 reviewbook_id
    console.log('movie write page로 넘어온 reviewbook_id : ' + this.reviewbookId);

    // 리뷰 수정 시 detail 로딩 및 title 설정
    if (this.reviewId !== null) {
      this.loadDetail();
      this.titleText = "리뷰 수정";
    }
  }
  onSubmit() {
    // reviewbook Formcontrol value 설정
    this.reviewForm.controls['reviewlist'].setValue(this.reviewbookId, { onlyself: true });

    // 새 리뷰 작성 시
    if (this.reviewId === null) {
      this.reviewService.writeReview('movie', this.reviewForm.value).subscribe(res => {
        console.log("입력한 reviewForm : ", this.reviewForm);
        console.log("새 리뷰 등록 결과 : ", res);
        // 리뷰북 페이지로 이동
        this.router.navigate(['movie/list', this.reviewbookId]);
      })
    }

    //리뷰 수정 시
    else {
      this.reviewService.editReview('movie', this.reviewId, this.reviewForm.value).subscribe(res => {
        console.log("입력한 reviewForm : ", this.reviewForm);
        console.log("리뷰 수정 등록 결과 : ", res);
        // 리뷰 디테일 페이지로 이동
        this.router.navigate(['movie/detail', this.reviewId]);
      })
    }
  }
  // 리뷰 수정 시 디테일 가져오기
  loadDetail() {
    this.reviewService.getReviewDetail('movie', this.reviewId).subscribe(data => {
      console.log('reviewService 요청할 때 reivew_id : ', this.reviewId);
      console.log('받아온 Review data', data);
      this.movie = data;
      this.reviewbookId = data['reviewbook'];
      console.log("!!! loadDetail !!!");
      console.log(this.reviewbookId);
    })
  }
  async openSearchMovieModal() {
    const modal = await this.modalController.create({
      component: MovieApiPage,
    });
    modal.onDidDismiss()
      .then((data) => {

        if (data['data'] != undefined) {
          this.movie = data['data'];
          this.movie['genre'] = this.movie['genre_ids'][0];
          this.movie['releaseDate'] = this.movie['release_date'];
          this.movie['posterPath'] = this.movie['poster_path'];
          

          this.movieService.searchDirector(this.movie['id']).subscribe(res => {
            this.movie['director'] = res[0]['name'];
          });
        }



      })
    return await modal.present();
  };

}

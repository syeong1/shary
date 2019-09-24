import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookApiPage } from './../../../search/book-api/book-api.page';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {

  reviewForm: FormGroup;
  book: Object;
  nowDate: String = new Date().toISOString();
  reviewbookId: string = null;
  reviewId: string = null;
  titleText: string = '새 리뷰 작성';

  constructor(private modalController: ModalController, private reviewService: ReviewService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      reviewbook: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      author: new FormControl(''),
      publisher: new FormControl(''),
      pubdate: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl(''),
      readingStartDate: new FormControl(''),
      readingEndDate: new FormControl(''),
      impressivePassage: new FormControl(''),
      review: new FormControl(''),
      tags: new FormControl(''),
      rating: new FormControl('')
    })
    this.reviewbookId = this.activatedRoute.snapshot.paramMap.get('reviewbook_id');
    this.reviewId = this.activatedRoute.snapshot.paramMap.get('review_id');

    // 새 리뷰 작성 시 필요한 reviewbook_id
    console.log('book write page로 넘어온 reviewbook_id : ' + this.reviewbookId);

    // 리뷰 수정 시 detail 로딩 및 title 설정
    if (this.reviewId !== null) {
      this.loadDetail();
      this.titleText = "리뷰 수정";
    }
  }

  rating(ev){
    console.log(ev);
  }
  onSubmit() {

    // reviewbook Formcontrol value 설정
    this.reviewForm.controls['reviewbook'].setValue(this.reviewbookId, { onlyself: true });
    
    // 새 리뷰 작성 시
    if (this.reviewId === null) {
      this.reviewService.writeReview('book', this.reviewForm.value).subscribe(res => {
        console.log("입력한 reviewForm : ", this.reviewForm);
        console.log("새 리뷰 등록 결과 : ", res);
        // 리뷰북 페이지로 이동
        this.router.navigate(['book/list', this.reviewbookId]);
      })
    }

    //리뷰 수정 시
    else {
      this.reviewService.editReview('book', this.reviewId, this.reviewForm.value).subscribe(res => {
        console.log("입력한 reviewForm : ", this.reviewForm);
        console.log("리뷰 수정 등록 결과 : ", res);
        // 리뷰 디테일 페이지로 이동
        this.router.navigate(['book/detail', this.reviewId]);
      })
    }
  }

  // 리뷰 수정 시 디테일 가져오기
  loadDetail() {
    this.reviewService.getReviewDetail('book', this.reviewId).subscribe(data => {
      console.log('reviewService 요청할 때 reivew_id : ', this.reviewId);
      console.log('받아온 Review data', data);
      this.book = data;
      this.reviewbookId = data['reviewbook'];
      console.log("!!! loadDetail !!!");
      console.log(this.reviewbookId);
    })
  }

  // 네이버 책 검색 API Modal Page
  async openSearchBookModal() {
    const modal = await this.modalController.create({
      component: BookApiPage
    })

    modal.onDidDismiss()
      .then((data) => {

        this.book = data['data'];
        console.log('origin', this.book);

        // html 태그 삭제 및 날짜 처리
        if (data['data'] !== undefined) {
          this.book['title'] = this.book['title'].replace(/<[^>]*>/g, '');
          this.book['author'] = this.book['author'].replace(/<[^>]*>/g, '');
          this.book['description'] = this.book['description'].replace(/<[^>]*>/g, '').replace(/&#x0D;/g, '\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
          this.book['pubdate'] = this.book['pubdate'].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
        }

        console.log('new', this.book);

      })
    return await modal.present();
  };

}

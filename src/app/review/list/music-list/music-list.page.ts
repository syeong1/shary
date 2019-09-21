import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.page.html',
  styleUrls: ['./music-list.page.scss'],
})
export class MusicListPage implements OnInit {

  reviewbookId: string;
  reviewbookTitle: string = null;
  reviews: any;
  searchTerm: string = '';
  msg: string = "";


  constructor(private reviewService: ReviewService,
    private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.reviewbookTitle = this.router.getCurrentNavigation().extras.state.title;
        console.log('extras.state.title : ' + this.reviewbookTitle);
      }
    })
  }

  ngOnInit() {
    this.reviewbookId = this.route.snapshot.paramMap.get('id');
    console.log('책 리뷰북 id : ', this.reviewbookId);
  }

  ionViewWillEnter() {
    this.getReviewList();
  }

  getReviewList() {
    this.reviewService.getReviewList('music', this.reviewbookId).subscribe(data => {
      console.log('*** reviewService.getReviewList 요청할 때 reviewbookId : ', this.reviewbookId);
      console.log('받아온 Reviews data', data);
      this.reviews = data;
    })
  }

  openWritePage() {
    this.router.navigate(['/music/write', this.reviewbookId]);
  }

  openReivewDetailPage(review) {
    this.router.navigate(['music/detail', review._id]);
  }


  searchReview() {
    console.log('현재 리뷰북 id', this.reviewbookId);
    console.log('검색어', this.searchTerm);
    if (this.searchTerm == "") {
      this.getReviewList();
    }
    else {
      this.reviewService.getSearchInReviewbook('music', this.reviewbookId, this.searchTerm).subscribe(data => {
        console.log('받아온 Reviews data', data);
        if (data['length'] === 0) {
          this.msg = "검색된 리뷰가 없습니다.";
          this.reviews = "";
        }
        else {
          this.msg = ""
        }
        this.reviews = data;
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.page.html',
  styleUrls: ['./book-list.page.scss'],
})
export class BookListPage implements OnInit {

  reviewbookId: string;
  reviewbookTitle: string = null;
  reviews: any;

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
    this.reviewService.getReviewList('book', this.reviewbookId).subscribe(data => {
      console.log('*** reviewService.getReviewList 요청할 때 reviewbookId : ', this.reviewbookId);
      console.log('받아온 Reviews data', data);
      this.reviews = data;
    })
  }

  openWritePage() {
    this.router.navigate(['/book/write', this.reviewbookId]);
  }

  openReivewDetailPage(review) {
    this.router.navigate(['book/detail', review._id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.page.html',
  styleUrls: ['./food-list.page.scss'],
})
export class FoodListPage implements OnInit {

  reviewbookId: string;
  reviewbookTitle: string = null;
  reviews: any;

  constructor(private reviewService: ReviewService, 
    private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.reviewbookTitle = this.router.getCurrentNavigation().extras.state.title;
        // console.log('extras.state.title : ' + this.reviewbookTitle);
      }
    })
   }

   ngOnInit() {
    this.reviewbookId = this.route.snapshot.paramMap.get('id');
    // console.log('맛집 리뷰북 id : ', this.reviewbookId);
  }

  ionViewWillEnter() {
    this.getReviewList();
  }

  getReviewList() {
    this.reviewService.getReviewList('food', this.reviewbookId).subscribe(data => {
      // console.log('*** reviewService.getReviewList 요청할 때 reviewbookId : ', this.reviewbookId);
      // console.log('받아온 Reviews data', data);
      this.reviews = data;
    })
  }

  openWritePage() {
    this.router.navigate(['/food/write', this.reviewbookId]);
  }

  openReivewDetailPage(review) {
    this.router.navigate(['food/detail', review._id]);
  }

}

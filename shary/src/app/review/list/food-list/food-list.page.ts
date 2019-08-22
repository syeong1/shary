import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.page.html',
  styleUrls: ['./food-list.page.scss'],
})
export class FoodListPage implements OnInit {

  reviewbookId;
  reviews;

  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute, private router: Router) {  }

  ngOnInit() {
    this.reviewbookId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('review 리뷰북 id : ', this.reviewbookId);
    this.getReviews();
  }

  openWritePage(){
    this.router.navigate(['/food/write', this.reviewbookId]);
  }

  openDetailPage(review) {
    this.router.navigate(['/food/detail', review._id]);
  }

  getReviews() {
    this.foodService.getFoodReviewList(this.reviewbookId).subscribe(data => {
      console.log('리뷰 리스트 Service 요청할 때 id : ', this.reviewbookId);
      console.log('받아온 Reviews data', data);
      this.reviews = data;
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Observable } from 'rxjs';
import { ReviewService } from 'src/app/services/review.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.page.html',
  styleUrls: ['./food-list.page.scss'],
})
export class FoodListPage implements OnInit {


  reviewbookId: string;
  reviewbookTitle: string = null;
  reviews: any;
  filter: string = '등록일순';
  sorting: boolean = true;

  constructor(private reviewService: ReviewService,
    private route: ActivatedRoute, private router: Router,
    private actionSheetController: ActionSheetController) {
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

  changeSort() {
    this.sorting = !this.sorting;
    this.getReviewList();
  }

  orderByCreatedAt(sortBy: boolean, originalData: any[]) {
    // 최근순, 오름차순
    if (sortBy === true) {
      originalData.sort((dataA: any, dataB: any) => {
        return dataA.createdAt <= dataB.createdAt ? -1 : 1
      });
      // 나중순, 내림차순
    } else if (sortBy === false) {
      originalData.sort((dataA: any, dataB: any) => {
        return dataA.createdAt > dataB.createdAt ? -1 : 1
      })
    }
    return originalData
  }

  orderByEditedAt(sortBy: boolean, originalData: any[]) {
    // 최근순, 오름차순
    if (sortBy === true) {
      originalData.sort((dataA: any, dataB: any) => {
        return dataA.editedAt <= dataB.editedAt ? -1 : 1
      });
      // 나중순, 내림차순
    } else if (sortBy === false) {
      originalData.sort((dataA: any, dataB: any) => {
        return dataA.editedAt > dataB.editedAt ? -1 : 1
      })
    }
    return originalData
  }

  orderByRating(sortBy: boolean, originalData: any[]) {
    // 최근순, 오름차순
    if (sortBy === true) {
      originalData.sort((dataA: any, dataB: any) => {
        return dataA.rating <= dataB.rating ? -1 : 1
      });
      // 나중순, 내림차순
    } else if (sortBy === false) {
      originalData.sort((dataA: any, dataB: any) => {
        return dataA.rating > dataB.rating ? -1 : 1
      })
    }
    return originalData
  }

  orderByName(sortBy: boolean, originalData: any[]) {
    // 최근순, 오름차순
    if (sortBy === true) {
      originalData.sort((dataA: any, dataB: any) => {
        return dataA.name <= dataB.name ? -1 : 1
      });
      // 나중순, 내림차순
    } else if (sortBy === false) {
      originalData.sort((dataA: any, dataB: any) => {
        return dataA.name > dataB.name ? -1 : 1
      })
    }
    return originalData
  }

  //sorting data 
  getReviewList() {
    this.reviewService.getReviewList('food', this.reviewbookId).subscribe((data: any[]) => {
      if (this.filter === '등록일순') {
        this.reviews = this.orderByCreatedAt(this.sorting, data);
      } else if (this.filter === '수정순') {
        this.reviews = this.orderByEditedAt(this.sorting, data);
      } else if (this.filter === '별점순') {
        this.reviews = this.orderByRating(this.sorting, data);
      } else if (this.filter === '이름순') {
        this.reviews = this.orderByName(this.sorting, data);
      }
    })
  }

  openWritePage() {
    this.router.navigate(['/food/write', this.reviewbookId]);
  }

  openReivewDetailPage(review) {
    this.router.navigate(['food/detail', review._id]);
  }

  /**
   * order and sort data 
   * 
   */
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: '정렬방법',
      buttons: [{
        text: '등록일순',
        handler: () => {
          this.filter = '등록일순'
          this.sorting = true;
          this.getReviewList();
          console.log('등록순 정렬이 설정되었습니다.');
        }
      }, {
        text: '수정순',
        handler: () => {
          this.filter = '수정순'
          this.sorting = true;
          this.getReviewList();
          console.log('수정순 정렬이 설정되었습니다.');
        }
      }, {
        text: '별점순',
        handler: () => {
          this.filter = '별점순'
          this.sorting = true;
          this.getReviewList();
          console.log('별점순 정렬이 설정되었습니다.');
        }
      }, {
        text: '이름순',
        handler: () => {
          this.filter = '이름순'
          this.sorting = true;
          this.getReviewList();
          console.log('이름순 정렬이 설정되었습니다.');
        }
      }]
    });

    await actionSheet.present();
  }

}

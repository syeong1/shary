import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {

  reviewbookId: string;
  reviewbookTitle: string = null;
  reviews: any;
  searchTerm: string = "";
  msg: string = "";
  filter: string = '등록일순';
  sorting: boolean = true;

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router, private reviewService: ReviewService, private actionSheetController: ActionSheetController) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.reviewbookTitle = this.router.getCurrentNavigation().extras.state.title;
        console.log('extras.state.title : ' + this.reviewbookTitle);
      }
    })

  }

  ngOnInit() {
    this.reviewbookId = this.route.snapshot.paramMap.get('id');
    console.log('영화 리뷰북 id: ', this.reviewbookId);

  }
  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.getReviewList();
  }
  getReviewList() {
    this.reviewService.getReviewList('movie', this.reviewbookId).subscribe(data => {
      console.log('*** reviewService.getReviewList 요청할 때 reviewbookId : ', this.reviewbookId);
      console.log('받아온 Reviews data', data);
      this.reviews = data;
    })
  }



  openWritePage() {
    this.router.navigate(['movie/write', this.reviewbookId]);
  }

  openReivewDetailPage(reviewId) {
    this.router.navigate(['movie/detail', reviewId]);
  }

  searchReview() {
    console.log('현재 리뷰북 id', this.reviewbookId);
    console.log('검색어', this.searchTerm);
    if (this.searchTerm == "") {
      this.getReviewList();
    }
    else {
      this.reviewService.getSearchInReviewbook('movie', this.reviewbookId, this.searchTerm).subscribe(data => {
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
        return dataA.title <= dataB.title ? -1 : 1
      });
      // 나중순, 내림차순
    } else if (sortBy === false) {
      originalData.sort((dataA: any, dataB: any) => {
        return dataA.title > dataB.title ? -1 : 1
      })
    }
    return originalData
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
        },
      }]
    });

    await actionSheet.present();
  }
}

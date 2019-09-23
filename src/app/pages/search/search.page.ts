import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ReviewService } from './../../services/review.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('slider') slider: IonSlides;
  searchTerm: string = "";
  reviews: any;
  tagTerm: string;
  msg: string = "검색해주세요";
  page: string = '0';
  categories = [
    {
      index: 0,
      name: '책',
      category: 'book'
    },
    {
      index: 1,
      name: '영화',
      category: 'movie'

    },
    {
      index: 2,
      name: 'TV프로그램',
      category: 'tv'

    },
    {
      index: 3,
      name: '맛집',
      category: 'food'
    },
    {
      index: 4,
      name: '음악',
      category: 'music'
    }
  ];


  type: any[] = [
    {
      id: 1,
      text: '리뷰'
    },
    {
      id: 2,
      text: '태그'
    }
  ];
  selectedType;

  constructor(private reviewService: ReviewService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.tagTerm = this.activatedRoute.snapshot.paramMap.get('tagTerm');
    console.log('this.tagTerm', this.tagTerm);
    console.log('this.tagTerm !== null', this.tagTerm !== null);
    if (this.tagTerm !== null) {
      this.selectedType = this.type[1].id;
      this.searchTerm = this.tagTerm;
      this.searchReviewByTag();
    } else {
      this.selectedType = this.type[0].id;
    }
  }

  // 리뷰 전체 검색 (타이틀, 저자, 아티스트이름)
  searchReview() {
    console.log('검색할 카테고리', this.categories[this.page].category);
    console.log('검색어', this.searchTerm);
    this.reviewService.getSearchReview(this.categories[this.page].category, this.searchTerm).subscribe(data => {
      console.log('받아온 Reviews data', data);
      if (data['length'] === 0) {
        this.msg = "리뷰가 없습니다.";
        this.reviews = '';
      }
      else {
        this.msg = ""
      }
      this.reviews = data;
    })
  }


  // 태그로 검색
  searchReviewByTag() {
    console.log('검색할 카테고리', this.categories[this.page].category);
    console.log('검색할 태그', this.tagTerm);
    this.reviewService.getSearchReviewByTag(this.categories[this.page].category, this.searchTerm).subscribe(data => {
      console.log('받아온 Reviews data', data);
      if (data['length'] === 0) {
        this.msg = "리뷰가 없습니다.";
        this.reviews = '';
      }
      else {
        this.msg = ""
      }
      this.reviews = data;
    })
  }

  openReivewDetailPage(review) {
    let category = this.categories[this.page].category
    this.router.navigate([category, 'detail', review._id]);
  }

  selectedTab(item) {
    this.slider.slideTo(item.index);
  }

  async moveButton() {
    let index = await this.slider.getActiveIndex();
    this.page = index.toString();
    console.log('this page', this.page);
    if (this.selectedType == '1') {
      this.searchReview();
    } else {
      this.searchReviewByTag();
    }
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    console.log('Selected Page Index', ev.detail);
  }

  changeType(ev: any) {
    if (ev.detail.value == 1) this.searchReview();
    else this.searchReviewByTag();
  }
}

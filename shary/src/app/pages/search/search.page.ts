import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { ReviewService } from './../../services/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('slider') slider: IonSlides;
  searchTerm: string = "";
  reviews: any;
  msg: string = "검색해주세요";
  categories = [
    {
      index: 0,
      name: '전체',
      category: 'all'
    },
    {
      index: 1,
      name: '책',
      category: 'book'
    },
    {
      index: 2,
      name: '영화',
      category: 'movie'

    },
    {
      index: 3,
      name: 'TV프로그램',
      category: 'tv'

    },
    {
      index: 4,
      name: '맛집',
      category: 'food'
    }, {
      index: 5,
      name: '음악',
      category: 'music'
    }
  ];

  page: string = '0';

  constructor(private reviewService: ReviewService, private router: Router) { }


  ngOnInit() {
  }

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

  openReivewDetailPage(review) {
    this.router.navigate(['music/detail', review._id]);
  }

  selectedTab(item) {
    this.slider.slideTo(item.index);
  }

  async moveButton() {
    let index = await this.slider.getActiveIndex();
    this.page = index.toString();
    console.log('this page', this.page);
    this.searchReview();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    console.log('Selected Page Index', ev.detail);
  }
}

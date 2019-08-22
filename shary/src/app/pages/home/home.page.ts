import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  categories = [
    { "category": 'book', "text": "책" },
    { "category": 'movie', "text": "영화" },
    { "category": 'tv', "text": "TV프로그램" },
    { "category": 'food', "text": "맛집" },
    { "category": 'music', "text": "음악" },
    { "category": 'like', "text": "즐겨찾기" }
  ];

  constructor(private router: Router) { }

  
  openReviewbookList(item) {
    console.log(item);
    let navigationExtras: NavigationExtras = {
      state: {
        category: item.category,
        text: item.text
      }
    };
    this.router.navigate(['/reviewbook/list', item.category], navigationExtras);
  }

  ngOnInit() {

  }

}

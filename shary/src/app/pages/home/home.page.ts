import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  category: string = '';

  constructor(private router: Router) { }

  
  /**
   * type에 맞는 reviewBook List 페이지로 이동
   * @param {string} type
   * use 'Router.navigate' with navigationExtras
   */
  openMyListByType(type) {
    let navigationExtras: NavigationExtras = type;
    this.router.navigate(['/list'], navigationExtras);
  }

  openBookList() {
    let navigationExtras: NavigationExtras = {
      state: {
        category: '책'
      }
    };
    this.router.navigate(['/reviewbook/list'], navigationExtras);
  }
  openMovieList() {
    let navigationExtras: NavigationExtras = {
      state: {
        category: '영화'
      }
    };
    this.router.navigate(['/reviewbook/list'], navigationExtras);
  }
  /**
   * food 타입을 list페이지에 전달
   */
  openFoodList() {
    let navigationExtras: NavigationExtras = {
      state: {
        category: 'food'
      }
    };
    this.router.navigate(['/reviewbook/list'], navigationExtras);
  }
  openTVList() {
    let navigationExtras: NavigationExtras = {
      state: {
        category: 'TV'
      }
    };
    this.router.navigate(['/reviewbook/list'], navigationExtras);
  }

  ngOnInit() {
  }

}

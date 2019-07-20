import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

 // categories = ['book', 'movie', 'tv', 'food', 'music'];
  categories = ['책', '영화', 'TV프로그램', '맛집', '음악'];
  
  constructor() { }


  ngOnInit() {
  }


  onCategoryChange(category){
    console.log(category.detail.value);
  }
}

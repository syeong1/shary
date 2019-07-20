import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  titles = ['영화제목1', '영화제목2', '영화제목3', '영화제목4', '영화제목5', '영화제목6'];
  year = '2019-03-07';



}

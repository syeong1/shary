import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {

  reviewbookId: string;
  reviews: any;

  constructor(private movieService: MovieService, private activatedRoute:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.reviewbookId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('영화 리뷰북 id: ',this.reviewbookId);
    this.getReviews();
    
  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    this.getReviews();
  }
  getReviews(){
    this.movieService.getBookReviewList(this.reviewbookId)
    .subscribe(data => {
      console.log('리뷰 리스트 Service 요청할 때 id : ', this.reviewbookId);
      console.log('받아온 Reviews data', data);
      this.reviews = data;
    })
  }
  openWritePage() {
    this.router.navigate(['/movie/write', this.reviewbookId]);
  }
  godetailreview(id){
    this.router.navigate(['movie/detail',id]);
  }

}

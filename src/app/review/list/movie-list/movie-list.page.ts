import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {

  reviewbookId: string;
  reviewbookTitle: string = null;
  reviews: any;

  constructor(private movieService: MovieService, private route:ActivatedRoute, private router: Router,private reviewService: ReviewService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.reviewbookTitle = this.router.getCurrentNavigation().extras.state.title;
        console.log('extras.state.title : ' + this.reviewbookTitle);
      }
    })

   }

  ngOnInit() {
    this.reviewbookId = this.route.snapshot.paramMap.get('id');
    console.log('영화 리뷰북 id: ',this.reviewbookId);
    
  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    this.getReviewList();
  }
  getReviewList(){
    this.reviewService.getReviewList('movie', this.reviewbookId).subscribe(data => {
      console.log('*** reviewService.getReviewList 요청할 때 reviewbookId : ', this.reviewbookId);
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

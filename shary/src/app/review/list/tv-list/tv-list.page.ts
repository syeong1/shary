import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.page.html',
  styleUrls: ['./tv-list.page.scss'],
})
export class TvListPage implements OnInit {

  reviewbookId: string;
  reviewbookTitle: string = null;
  reviews: any;
  constructor(private tvService: TvService, private activatedRoute:ActivatedRoute,private router:Router,private route:ActivatedRoute,private reviewService: ReviewService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.reviewbookTitle = this.router.getCurrentNavigation().extras.state.title;
        console.log('extras.state.title : ' + this.reviewbookTitle);
      }
    })
   }

  ngOnInit() {
    this.reviewbookId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('tv 리뷰북 id: ',this.reviewbookId);
  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    this.getReviewList();
  }

  getReviewList(){
    this.reviewService.getReviewList('tv', this.reviewbookId).subscribe(data => {
      console.log('*** reviewService.getReviewList 요청할 때 reviewbookId : ', this.reviewbookId);
      console.log('받아온 Reviews data', data);
      this.reviews = data;
    })
  }
  openWritePage() {
    this.router.navigate(['/tv/write', this.reviewbookId]);
  }
  godetailreview(id){
    this.router.navigate(['tv/detail',id]);
  }

}

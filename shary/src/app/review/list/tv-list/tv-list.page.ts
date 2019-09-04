import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.page.html',
  styleUrls: ['./tv-list.page.scss'],
})
export class TvListPage implements OnInit {

  reviewbookId: string;
  reviewbookTitle: string = null;
  reviews: any;
  constructor(private tvService: TvService, private activatedRoute:ActivatedRoute,private router:Router,private route:ActivatedRoute) {
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
    this.getReviews();
  }
  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    this.getReviews();
  }

  getReviews(){
    this.tvService.getBookReviewList(this.reviewbookId)
    .subscribe(data => {
      console.log('리뷰 리스트 Service 요청할 때 id : ', this.reviewbookId);
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

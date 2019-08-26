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
  reviews: any;
  constructor(private tvService: TvService, private activatedRoute:ActivatedRoute,private router:Router) { }

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

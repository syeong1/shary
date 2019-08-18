import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ReviewbookService } from 'src/app/services/reviewbook.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  category: string;
  titleText: string;

  constructor(private route: ActivatedRoute, private router: Router, private reviewbookService: ReviewbookService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.category;
        this.titleText = this.router.getCurrentNavigation().extras.state.text;

        console.log('넘어온 카테고리 : ' + this.category);
        this.reviewbookService.getReviewBookList(this.category).subscribe(data => {
          console.log('Service 요청할 때 카테고리 : ', this.category);
          console.log('받아온 data', data);
        })
      }
    })
  }

  openCreatePage() {
    let navigationExtras: NavigationExtras = {
      state: {
        category: this.category
      }
    };
    this.router.navigate(['/create'], navigationExtras);
  }

  ngOnInit() {
    
  }
}

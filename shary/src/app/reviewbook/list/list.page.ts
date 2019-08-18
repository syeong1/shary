import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  
  category: any;

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.category = this.router.getCurrentNavigation().extras.state.category;
        console.log('넘어온 카테고리 : ' + this.category);
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

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.page.html',
  styleUrls: ['./book-list.page.scss'],
})
export class BookListPage implements OnInit {

  reviewbookId: string;
  reviews: any;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.reviewbookId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('책 리뷰북 id : ', this.reviewbookId);
    this.getReviews();
  }

  ionViewWillEnter() {
    console.log("ionViewWillEnter");
    this.getReviews();
  }

  getReviews() {
    this.bookService.getBookReviewList(this.reviewbookId).subscribe(data => {
      console.log('리뷰 리스트 Service 요청할 때 id : ', this.reviewbookId);
      console.log('받아온 Reviews data', data);
      this.reviews = data;
    })
  }

  openWritePage() {
    this.router.navigate(['/book/write', this.reviewbookId]);
  }
}

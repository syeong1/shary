import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookApiPage } from 'src/app/search/book-api/book-api.page'
import { BookService } from './../../../services/book.service'

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {

  reviewForm: FormGroup;
  book = {};
  nowDate: String = new Date().toISOString();

  constructor(private modalController: ModalController, private bookService: BookService) {
  }

  ngOnInit() {

    this.reviewForm = new FormGroup({
      writer: new FormControl(''),
      reviewlist_id: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      author: new FormControl(''),
      publisher: new FormControl(''),
      pubdate: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl(''),
      readingStartDate: new FormControl(''),
      readingEndDate: new FormControl(''),
      impressivePassage: new FormControl(''),
      review: new FormControl(''),
      tags: new FormControl(''),
    })
  }

  onSubmit() {
    this.bookService.writeReview(this.reviewForm.value).subscribe(res => {
      console.log(res);
    })
  }

  async openSearchBookModal() {
    const modal = await this.modalController.create({
      component: BookApiPage
    })

    modal.onDidDismiss()
      .then((data) => {

        this.book = data['data'];
        console.log('origin', this.book);

        // html 태그 삭제 및 날짜 처리
        this.book['title'] = this.book['title'].replace(/<[^>]*>/g, '');
        this.book['author'] = this.book['author'].replace(/<[^>]*>/g, '');
        this.book['description'] = this.book['description'].replace(/<[^>]*>/g, '').replace(/&#x0D;/g, '\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        this.book['pubdate'] = this.book['pubdate'].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');

        console.log('new', this.book);

      })
    return await modal.present();
  };

}

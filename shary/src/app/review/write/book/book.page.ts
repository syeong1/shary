import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookApiPage } from 'src/app/search/book-api/book-api.page'

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {

  reviewForm: FormGroup;
  book = {};

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {

    this.reviewForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      writer: new FormControl(''),
      reviewlist_id: new FormControl(''),
      author: new FormControl(''),
      publisher: new FormControl(''),
      pubdate: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      price: new FormControl(''),
      readingStartDate: new FormControl(''),
      readingEndDate: new FormControl(''),
      famouse_line: new FormControl(''),
      impressivePassage: new FormControl(''),
      review: new FormControl(''),
      tags: new FormControl(''),

    })
  }

  async openSearchBookModal() {
    const modal = await this.modalController.create({
      component: BookApiPage
    })

    modal.onDidDismiss()
      .then((data) => {

        // html 태그 처리
        let plainTitle: any = data['data']['title'].replace(/<[^>]*>/g, '');
        let plainAutor = data['data']['author'].replace(/<[^>]*>/g, '');
        let plainDescription = data['data']['description'].replace(/<[^>]*>/g, '').replace(/&#x0D;/g, '\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

        this.book = data['data'];
        console.log('origin', this.book);

        this.book['title'] = plainTitle;
        this.book['author'] = plainAutor;
        this.book['description'] = plainDescription;

        console.log('new', this.book);
      })
    return await modal.present();
  };

}

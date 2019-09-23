import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from './../../services/book.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-book-api',
  templateUrl: './book-api.page.html',
  styleUrls: ['./book-api.page.scss'],
})
export class BookApiPage implements OnInit {

  results: Observable<any>;
  searchTerm: string = '';
  selectBook = null;

  constructor(private bookService: BookService, private modalController: ModalController) { }

  ngOnInit() {
  }

  searchChanged() {
    this.bookService.getBookData(this.searchTerm).subscribe(
      results => {
        this.results = results;
        console.log('subsrcibe', results);
      }
    );
  }

  backtoWritepage(item) {
    console.log(item);
    this.selectBook = item;
    this.modalController.dismiss(this.selectBook);
  }

  back() {
    this.modalController.dismiss();
  }
  
}

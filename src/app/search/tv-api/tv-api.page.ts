import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TvService } from 'src/app/services/tv.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tv-api',
  templateUrl: './tv-api.page.html',
  styleUrls: ['./tv-api.page.scss'],
})
export class TvApiPage implements OnInit {

  title: String;
  results: Observable<any>;
  searchTerm: string = '';
  selectTv = null;

  constructor(private tvService: TvService, private modalController: ModalController) { }

  ngOnInit() {
  }
  searchChanged() {
    this.results = this.tvService.getTvData(this.searchTerm);
  };
  backtoWritepage(tv) {
    this.selectTv = tv;
    this.modalController.dismiss(this.selectTv);
  }
  back() {
    this.modalController.dismiss();
  }
  onKeyPressed(event) {
    console.log('onKeyPress')
    console.log(event);
    if (event.keyCode == 13) {
      let activeElement = <HTMLElement>document.activeElement;
      activeElement.blur();

    }
  }
}

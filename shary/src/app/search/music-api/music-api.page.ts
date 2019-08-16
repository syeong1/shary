import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicService } from './../../services/music.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-music-api',
  templateUrl: './music-api.page.html',
  styleUrls: ['./music-api.page.scss'],
})
export class MusicApiPage implements OnInit {

  results: Observable<any>;
  searchTerm: string = '';
  selectMusic = null;

  constructor(private musicService: MusicService, private modalController: ModalController) { }


  ngOnInit() {
  }

  searchChanged() {
    this.musicService.getMusicData(this.searchTerm).subscribe(
      results => {
        this.results = results;
        console.log('subsrcibe', results);
      }
    );
  }

  backtoWritepage(item) {
    console.log(item);
    this.selectMusic = item;
    this.modalController.dismiss(this.selectMusic);
  }

  back() {
    this.modalController.dismiss();
  }

}

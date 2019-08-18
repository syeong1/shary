import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MusicApiPage } from 'src/app/search/music-api/music-api.page'

@Component({
  selector: 'app-music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage implements OnInit {

  reviewForm: FormGroup;
  music: null;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      writer: new FormControl(''),
      reviewlist_id: new FormControl(''),
      trackName: new FormControl('', [Validators.required]),
      artistName: new FormControl(''),
      collectionName: new FormControl(''),
      primaryGenreName: new FormControl(''),
      releaseDate: new FormControl(''),
      listeningDate: new FormControl(''),
      image: new FormControl(''),
      review: new FormControl(''),
      tags: new FormControl(''),
      rating: new FormControl('')
    })
  }

  async openSearchMusicModal() {
    const modal = await this.modalController.create({
      component: MusicApiPage
    })

    modal.onDidDismiss()
      .then((data) => {
        console.log(data['data']);
        console.log(typeof data['data']);

        this.music = data['data'];
      })
    return await modal.present();
  };

}

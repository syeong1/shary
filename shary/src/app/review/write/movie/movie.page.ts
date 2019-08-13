import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  reviewForm: FormGroup;
  movie: null;

  constructor(private activateRoute: ActivatedRoute,private movieService: MovieService, private modalController:ModalController) { }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      title: new FormControl('',[Validators.required]),
      writer: new FormControl(''),
      reviewlist_id: new FormControl(''),
      release_date: new FormControl(''),
      overview: new FormControl(''),
      genre: new FormControl(''),
      watch_date: new FormControl(''),
      poster_path: new FormControl(''),
      rating: new FormControl(''),
      famouse_line: new FormControl(''),
      review: new FormControl(''),
      tags: new FormControl(''),

    })
    
  }
  async openSearchMovieModal(){
    const modal = await this.modalController.create({
      component: MoviePage,
    });
    modal.onDidDismiss()
    .then((data) => {
      
      console.log(data['data']);
      console.log(typeof data['data']);

      this.movie = data['data'];
    })
    return await modal.present(); 
  };

}

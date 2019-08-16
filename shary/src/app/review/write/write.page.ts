import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieApiPage } from 'src/app/search/movie-api/movie-api.page';

@Component({
  selector: 'app-write',
  templateUrl: './write.page.html',
  styleUrls: ['./write.page.scss'],
})
export class WritePage implements OnInit {

  reviewForm: FormGroup;
  movie: null;

  constructor(private activateRoute: ActivatedRoute,private movieService: MovieService,private modalController: ModalController,private router:Router) { }

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
      component: MovieApiPage,
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

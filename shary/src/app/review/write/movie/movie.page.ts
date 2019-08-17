import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MovieApiPage } from 'src/app/search/movie-api/movie-api.page';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  list_id: string;
  reviewForm: FormGroup;
  movie={};
  nowdate:String =new Date().toISOString();

  constructor(private activateRoute: ActivatedRoute,private movieService: MovieService, private modalController:ModalController) { }

  ngOnInit() {
    this.list_id=this.activateRoute.snapshot.paramMap.get('id');
    // this.imageService.images=[];
    // this.imageService.STORAGE_KEY= this.createImagesfolder();
    this.reviewForm = new FormGroup({
      writer: new FormControl(''),
      reviewlist_id: new FormControl(''),
      title: new FormControl('',[Validators.required]),
      release_date: new FormControl(''),
      director: new FormControl(''),
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

      if(data['data']!=undefined){
        this.movie = data['data'];
        this.movie['genre']=this.movie['genre_ids'][0];
     
      this.movieService.searchDirector(this.movie['id']).subscribe(res=>{
        this.movie['director'] = res[0];
      });
      }
      
      
      
    })
    return await modal.present(); 
  };

}

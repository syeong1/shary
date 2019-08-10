import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  results: Observable<any>;
  searchTerm: string='';
  type='movie';
  selectmovie = null;


  constructor(private movieService: MovieService,private modalController: ModalController) { }

  ngOnInit() {
  }

  searchChanged(){
    this.results =this.movieService.searchData(this.searchTerm,this.type);
  };

  backtoWritepage(movie){
    this.selectmovie= movie;
    this.modalController.dismiss(this.selectmovie);
  }
  back(){
    this.modalController.dismiss();
  }

  
  
  


}

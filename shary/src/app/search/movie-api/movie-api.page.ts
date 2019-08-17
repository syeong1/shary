import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-movie-api',
  templateUrl: './movie-api.page.html',
  styleUrls: ['./movie-api.page.scss'],
})
export class MovieApiPage implements OnInit {

  title: String;
  results: Observable<any>;
  searchTerm: string='';
  type= 'movie';
  selectmovie = null;

  constructor(private movieService: MovieService, private modalController: ModalController) { }

  ngOnInit() {
  }
  searchChanged(){
    this.results =this.movieService.searchData(this.searchTerm,this.type)
  };
  backtoWritepage(movie){
    this.selectmovie= movie;
    this.modalController.dismiss(this.selectmovie);
  }
  back(){
    this.modalController.dismiss();
  }
  onKeyPressed(event){
    console.log('onKeyPress')
    console.log(event);
    if(event.keyCode==13){
      let activeElement = <HTMLElement>document.activeElement;
      activeElement.blur();
      
    }
  }

}

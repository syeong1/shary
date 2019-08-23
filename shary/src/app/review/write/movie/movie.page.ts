import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  reviewbookId: string;
  reviewForm: FormGroup;
  movie={};
  nowdate:String =new Date().toISOString();

  constructor(private activateRoute: ActivatedRoute,private movieService: MovieService, private modalController:ModalController,private router:Router) { }

  ngOnInit() {
    this.reviewForm = new FormGroup({
      writer: new FormControl(''),
      reviewList: new FormControl(''),
      title: new FormControl('',[Validators.required]),
      releaseDate: new FormControl(''),
      director: new FormControl(''),
      overview: new FormControl(''),
      genre: new FormControl(''),
      watchDate: new FormControl(''),
      posterPath: new FormControl(''),
      rating: new FormControl(''),
      famouseLine: new FormControl(''),
      review: new FormControl(''),
      tags: new FormControl(''),

    })
    this.reviewbookId=this.activateRoute.snapshot.paramMap.get('id');
    console.log('book write page로 넘어온 리뷰북 아이디 : ' + this.reviewbookId);
    this.reviewForm.controls['reviewList'].setValue(this.reviewbookId, { onlyself: true });
    
  }
  onSubmit() {
    this.movieService.writeReview(this.reviewForm.value).subscribe(res => {
      console.log(this.reviewForm);
      console.log(res);
      this.router.navigate(['movie/list', this.reviewbookId]);
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

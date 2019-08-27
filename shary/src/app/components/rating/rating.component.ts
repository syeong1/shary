import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

enum COLORS {
  GREY = "#E0E0E0",
  YELLOW = "#FFCA28"
}

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  @Input() rating: number;

  @Output() ratingChange: EventEmitter<number>= new EventEmitter();

  constructor() { }

  rate(index:number){
    this.rating = index;
    this.ratingChange.emit(this.rating);

  }
  getColor(index:number){
    if(this.isAboveRating(index)){
      return COLORS.GREY;
    }
    switch (this.rating){
      case 1:
      case 2:
        return COLORS.YELLOW;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.YELLOW;
      default:
        return COLORS.GREY;
    }


  }

  isAboveRating(index:number):boolean{
    return index> this.rating;
  }

  ngOnInit() {}

}

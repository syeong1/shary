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

  @Input() rating: number = 0;

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  rate(index: number) {
    this.rating = index;
    this.ratingChange.emit(this.rating);
  }

  getColor(index: number) {
    if (this.isAboveRating(index)) {
      return COLORS.GREY;
    }
    if (this.rating > 0) return COLORS.YELLOW;
    else return COLORS.GREY;
  }

  isAboveRating(index: number): boolean {
    return index > this.rating;
  }

  ngOnInit() { }

}

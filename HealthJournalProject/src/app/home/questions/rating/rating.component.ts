import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  ratingSelected = -1;
  @Input() isDisabled: boolean;
  @Output() public OnSelectRating: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  public OnClickAction(value: number) {
    this.ratingSelected = Number(value);
    this.OnSelectRating.emit(value);
  }

}

import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Walk } from '../../models/Walk';

@Component({
  selector: 'app-star-rating',
  imports: [NgFor],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() currentWalk!: Walk;
  starsArray = Array(5)
}

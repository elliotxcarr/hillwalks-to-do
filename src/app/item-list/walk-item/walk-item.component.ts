import { Component, inject, Input } from '@angular/core';
import { Walk } from '../../models/Walk';
import { WalkStore } from '../../store/walk/walks.store';
import { UserStore } from '../../store/user/user.store';
import { NgClass } from '@angular/common';
import { StarRatingComponent } from '../../utils/star-rating/star-rating.component';

@Component({
  selector: 'app-walk-item',
  imports: [NgClass, StarRatingComponent],
  templateUrl: './walk-item.component.html',
  styleUrl: './walk-item.component.css'
})
export class WalkItemComponent {
  @Input() walk!: Walk
  readonly walkStore = inject(WalkStore);
  readonly userStore = inject(UserStore);

  getDifficultyColour(difficulty: number): string {
    return (
      {
        1: 'text-green-700',
        2: 'text-green-700',
        3: 'text-orange-700',
        4: 'text-red-700',
        5: 'text-red-700',
      }[difficulty] || ''
    );
  }
}

import { Component, computed, effect,inject, Signal, signal} from '@angular/core';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { Walk } from '../models/Walk';
import { FormsModule} from '@angular/forms';
import { UserStore } from '../store/user/user.store';
import { WalkStore } from '../store/walk/walks.store';

@Component({
  selector: 'app-details-panel',
  imports: [SpinnerComponent, NgIf, FormsModule],
  templateUrl: './details-panel.component.html',
  styleUrl: './details-panel.component.css'
})
export class DetailsPanelComponent {
  readonly userStore = inject(UserStore);
  readonly walkStore = inject(WalkStore);

  imageLoaded = signal(false);
  private selectedImageUrl: string | null = null;

  constructor(){
    effect(()=>{
      const walk = this.walkStore.selectedWalk();

      if(!walk) return;

      if(walk.image !== this.selectedImageUrl){
        this.imageLoaded.set(false);
        this.selectedImageUrl = walk.image
      }
    })
  }
}

import { Component, effect,inject,signal} from '@angular/core';
import { FormsModule} from '@angular/forms';
import { SpinnerComponent } from '../../utils/spinner/spinner.component';
import { UserStore } from '../../store/user/user.store';
import { WalkStore } from '../../store/walk/walks.store';

@Component({
  selector: 'app-details-panel',
  imports: [SpinnerComponent, FormsModule],
  templateUrl: './details-panel.component.html',
  styleUrl: './details-panel.component.css'
})
export class DetailsPanelComponent {
  readonly userStore = inject(UserStore);
  readonly walkStore = inject(WalkStore);

  imageLoaded = signal(false);
  private selectedImageUrl: string | null = null;
  walk = this.walkStore.selectedWalk();

  infoLabels = ['Level', 'Duration', 'Bog Factor', 'Distance'];
  
  constructor(){
    effect(()=>{
      if(!this.walk) return;

      if(this.walk.image !== this.selectedImageUrl){
        this.imageLoaded.set(false);
        this.selectedImageUrl = this.walk.image
      }
    })
  }
}

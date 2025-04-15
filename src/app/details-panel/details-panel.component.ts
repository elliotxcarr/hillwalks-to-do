import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, inject} from '@angular/core';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { Walk } from '../models/Walk';
import { FormsModule, NgModel } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addCompleteWalk } from '../state/userState/user.actions';
import { WalkService } from '../services/walk.service';

@Component({
  selector: 'app-details-panel',
  imports: [SpinnerComponent, NgIf, FormsModule],
  templateUrl: './details-panel.component.html',
  styleUrl: './details-panel.component.css'
})
export class DetailsPanelComponent {
  
  _selectedWalk!: Walk ;

  @Input() set selectedWalk(walk: Walk){
     if (!this._selectedWalk || this._selectedWalk.image !== walk.image) {
      this.imageLoaded = false;
    }
    this._selectedWalk = walk;
  }

  @Output() close = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();
  @Output() sendComplete = new EventEmitter<Walk>();

  private store = inject(Store);
  private walkService = inject(WalkService);

  imageLoaded: boolean = false;

  
  
  closeComponent = ()=>{
     this.close.emit();
  }

  walkComplete(walk:Walk){
    console.log(walk)
    if(walk){
      this.sendComplete.emit(walk)
    }
    else{
      console.error('No walk selected')
    }
    
  }



}

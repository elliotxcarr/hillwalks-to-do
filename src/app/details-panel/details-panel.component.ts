import { Component, EventEmitter, Input, Output} from '@angular/core';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { Walk } from '../models/Walk';
import { FormsModule} from '@angular/forms';

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

  imageLoaded: boolean = false;

  closeComponent = ()=>{
     this.close.emit();
  }

  walkComplete(walk:Walk){
    if(walk){
      this.sendComplete.emit(walk)
    }
    else{
      console.error('No walk selected')
    }
  }
}

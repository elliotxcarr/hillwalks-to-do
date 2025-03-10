import { NgIf } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-details-panel',
  imports: [NgIf],
  templateUrl: './details-panel.component.html',
  styleUrl: './details-panel.component.scss'
})
export class DetailsPanelComponent {
  @Input() walk: any;
  
  clearSelection = ()=>{
     this.walk = null
     console.log('cleared')
  }

  setWalkComplete = ()=>{
    if(!this.walk.completed){
      this.walk = [...this.walk.completed, true]
      console.log('walk completed')
    }
    else if(this.walk.completed){
      console.info('walk is already completed')
    }
  }
}

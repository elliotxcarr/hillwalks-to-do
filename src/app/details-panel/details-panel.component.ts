import { NgIf } from '@angular/common';
import { Component, Input, } from '@angular/core';

@Component({
  selector: 'app-details-panel',
  imports: [NgIf],
  templateUrl: './details-panel.component.html',
  styleUrl: './details-panel.component.scss'
})
export class DetailsPanelComponent {
  @Input() walk: any;
  imageLoading: boolean = false;

  clearSelection = ()=>{
     this.walk = null
  }

}

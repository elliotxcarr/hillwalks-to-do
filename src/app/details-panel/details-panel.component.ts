import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-details-panel',
  imports: [NgIf],
  templateUrl: './details-panel.component.html',
  styleUrl: './details-panel.component.css'
})
export class DetailsPanelComponent {
  @Input() walk: any;
  @Output() close = new EventEmitter<void>();

  imageLoading: boolean = false;

  closeComponent = ()=>{
     this.close.emit();
  }


}

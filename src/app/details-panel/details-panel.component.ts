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
  
}

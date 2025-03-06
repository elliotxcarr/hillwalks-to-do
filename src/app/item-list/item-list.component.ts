import { NgClass, NgFor } from '@angular/common';
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { walksObject } from '../walksObject';
import { DetailsPanelComponent } from '../details-panel/details-panel.component';

@Component({
  selector: 'app-item-list',
  imports: [NgFor, DetailsPanelComponent],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss'
})
export class ItemListComponent {
  selectedWalk:any ;
  
  sendWalk = (walk:any) =>{
    this.selectedWalk = walk;
    console.log(this.selectedWalk)
  }
  
  walksObj = walksObject

  colour = '';

  getDifficultyColour = (difficulty:number)=>{
    switch(difficulty){
      case 1:
        this.colour = 'text-green-700'
        break;
      case 2:
        this.colour = 'text-green-700'
        break;
      case 3:
        this.colour = 'text-orange-700'
        break;
      case 4:
        this.colour = 'text-red-700'
        break;
      case 5:
        this.colour = 'text-red-700'
    }
    return this.colour
  }

  sortRating = ()=>{
    this.walksObj  = walksObject.sort((a,b)=>b.rating - a.rating)
  }
  sortLevel = ()=>{
    this.walksObj = walksObject.sort((a,b)=> b.difficulty - a.difficulty)
  }
  starsArray = Array(5)
}

import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DetailsPanelComponent } from '../details-panel/details-panel.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [NgFor, DetailsPanelComponent, StarRatingComponent, NgClass,NgIf],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {
  selectedWalk: any;
  walkData: any[] = [];
  loading: boolean = true;

  constructor(){}

  ngOnInit(): void {
      this.getWalks();
  }
  
  getWalks (){
    this.loading = true;
    fetch("http://localhost:5001/walks")
    .then(res => res.json())
    .then(data => this.walkData = data)
    .catch(error=> console.error(error))
    .finally(()=> this.loading = false)
  }
 
  clearSelection(){
    this.selectedWalk = null;
  }

  sendWalk(walk: any) {
    this.selectedWalk = walk;
  }

  getDifficultyColour(difficulty: number): string {
    return {
      1: 'text-green-700',
      2: 'text-green-700',
      3: 'text-orange-700',
      4: 'text-red-700',
      5: 'text-red-700'
    }[difficulty] || '';
  }

  sortRating() {
    this.walkData = [...this.walkData].sort((a, b) => b.rating - a.rating);
  }

  sortLevel() {
    this.walkData = [...this.walkData].sort((a, b) => b.difficulty - a.difficulty);
  }

  sortCompleted() {
    this.walkData = [...this.walkData].sort((a, b) => Number(b.completed) - Number(a.completed));
  }

  sortToDo() {
    this.walkData = [...this.walkData].sort((a, b) => Number(a.completed) - Number(b.completed));
  }
}

import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DetailsPanelComponent } from '../details-panel/details-panel.component';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { Store } from '@ngrx/store';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { Walk } from '../models/Walk';
import { catchError, combineLatest, filter, from, map, Observable, of, shareReplay, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { WalkService } from '../services/walk.service';
import { addCompleteWalk } from '../state/userState/user.actions';
import { getCompletedWalks } from '../state/userState/user.selectors';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [DetailsPanelComponent, StarRatingComponent, NgClass,NgIf, SpinnerComponent, AsyncPipe, NgFor],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnInit {
  
  private walkService = inject(WalkService)
  private userService = inject(UserService)
  private store = inject(Store)

  selectedWalk: Walk | null = null;
  contentLoaded: boolean = false;
  walksToDisplay$!: Observable<Walk[]>;
  loggedInUser!: User;
  private destroy$ = new Subject<void>();
  sortOptions: string[] = [
    'Rating','Level','Completed', 'Todo', 
  ]

  ngOnInit() {
    this.contentLoaded = false;
    this.userService.loggedInUser$
    .pipe(
      filter(user => !!user && !!user._id), 
      takeUntil(this.destroy$),
      tap(user => {
        this.loggedInUser = user;
        this.refreshWalks();
      })
    ).subscribe()
  }

  refreshWalks() {
    if (!this.loggedInUser?._id) return;
    
    combineLatest([
      //set a walk state to retrieve the walks at the start
      this.walkService.getAllWalks(),
      this.store.select(getCompletedWalks)
    ]).pipe(
      map(([walks, completed_walks]) => {
        return walks.map(walk => ({
          ...walk,
          completed: !!completed_walks?.find(cw => cw.name === walk.name)
        }));
      }),
      take(1)
    ).subscribe(walks => {
      this.walksToDisplay$ = of(walks);
      this.contentLoaded = true;
    });
  }
  
  clearSelection(){
    this.selectedWalk = null;
  }

  sendWalk(walk: Walk) {
    this.selectedWalk = walk;
  }

  handleWalkComplete(walk: Walk){
    this.store.dispatch(addCompleteWalk({walk: {...walk, completed: true}}))
    
    this.walkService.saveCompletedWalk(this.loggedInUser._id!, walk).subscribe({
      next: ()=> {
        this.refreshWalks()
      },
      error: (err) =>{
        console.error('Failed to complete walk', err)
      }
    })
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

  handleSortButton(option: string){
    this.walksToDisplay$ = this.walksToDisplay$.pipe(
      map(walks =>{
        switch (option){
          case 'rating':
            return [...walks].sort((a, b) => b.rating - a.rating);
          case 'level':
            return [...walks].sort((a, b) => b.difficulty - a.difficulty);
          case 'completed':
            return [...walks].sort((a, b) => Number(b.completed) - Number(a.completed));
          case 'todo':
            return [...walks].sort((a, b) => Number(a.completed) - Number(b.completed));
          default:
            return walks
        }
      })
    ) 
  }
}

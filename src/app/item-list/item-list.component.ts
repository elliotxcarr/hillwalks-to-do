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
  selectedWalk: Walk | null = null;
  walkData: Walk[] = [];
  contentLoaded: boolean = false;
  userCompletedWalks: Walk[]= [];
  walksToDisplay$!: Observable<Walk[]>;
  private walkService = inject(WalkService)
  private userService = inject(UserService)
  private store = inject(Store)
  loggedInUser!: User;
  private destroy$ = new Subject<void>();
  compWalksSelector$: Observable<Walk[]> = this.store.select(getCompletedWalks)
  compWalksFromState: Walk[] =[];

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

  sortRating() {
    this.walksToDisplay$ = this.walksToDisplay$.pipe(
      map(walks =>
        [...walks].sort((a, b) => b.rating - a.rating)
      )
    )
  }

  sortLevel() {
    this.walksToDisplay$ = this.walksToDisplay$.pipe(
      map(walks =>
        [...walks].sort((a, b) => b.difficulty - a.difficulty)
      )
    )
  }

  sortCompleted() {
    this.walksToDisplay$ = this.walksToDisplay$.pipe(
      map(walks =>
        [...walks].sort((a, b) => Number(b.completed) - Number(a.completed))
      )
    )
    this.walkData = [...this.walkData].sort((a, b) => Number(b.completed) - Number(a.completed));
  }

  sortToDo() {
    this.walksToDisplay$ = this.walksToDisplay$.pipe(
      map(walks =>
        [...walks].sort((a, b) => Number(a.completed) - Number(b.completed))
      )
    )
  }
}

import { TestBed } from "@angular/core/testing"
import { UserStore } from "./user.store"
import { provideHttpClient } from "@angular/common/http";
import { Walk } from "../../models/Walk";
import { WalkService } from "../../services/walk.service";
import { patchState } from "@ngrx/signals";
import {unprotected} from "@ngrx/signals/testing"
import { of } from "rxjs";

describe('Walk Store', () => {
  let store: InstanceType<typeof UserStore>;
  let serviceSpy: jasmine.SpyObj<WalkService>;

  beforeEach(() => {
    serviceSpy = jasmine.createSpyObj<WalkService>('WalkService', ['saveCompletedWalk', 'deleteCompletedWalk']);
    serviceSpy.saveCompletedWalk.and.returnValue(of([] as Walk[]));
    serviceSpy.deleteCompletedWalk.and.returnValue(of({} as Walk));

    TestBed.configureTestingModule({
      providers: [UserStore, provideHttpClient(), {provide: WalkService, useValue: serviceSpy}]
    });

    store = TestBed.inject(UserStore) ;
  });

  describe('saveCompletedWalk', () => {
    const walkToSave = {_id: '12'} as Walk;

    it('adds the completed walk to state completed_walks', () => {
      store.saveCompletedWalk(walkToSave);
      expect(store.completed_walks().includes(walkToSave)).toBe(true)
    });

    it('calls WalkService saveCompletedWalk', () => {
      patchState(unprotected(store), ({id:'1'}))
      store.saveCompletedWalk(walkToSave);
      expect(serviceSpy.saveCompletedWalk).toHaveBeenCalledWith('1', '12')
    });
  });

  describe('removeCompletedWalk', () => {
    const walkToRemove = {_id: '15'} as Walk;
    
    it('adds then removes the walk from state completed_walks', () => {
      store.saveCompletedWalk(walkToRemove);
      expect(store.completed_walks().includes(walkToRemove)).toBe(true)
      store.removeCompletedWalk(walkToRemove)
      expect(store.completed_walks().includes(walkToRemove)).toBe(false)
    });

    it('calls WalkService deleteCompletedWalk', () => {
      patchState(unprotected(store), ({id:'1'}))
      store.removeCompletedWalk(walkToRemove);
      expect(serviceSpy.deleteCompletedWalk).toHaveBeenCalledWith('1', '15')
    });
  });
})
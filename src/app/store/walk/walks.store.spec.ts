import { TestBed } from "@angular/core/testing"
import { walkEvents, WalkStore } from "./walks.store"
import { provideHttpClient } from "@angular/common/http";
import { Dispatcher } from "@ngrx/signals/events";
import { describe, it, beforeEach, vi } from 'vitest';
describe('Walk Store', () => {
  let store: InstanceType<typeof WalkStore>;
  const mockDispatcher = {
    
    dispatch: vi.fn()
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalkStore, provideHttpClient(), { provide: Dispatcher, useValue: mockDispatcher }]
    });

    store = TestBed.inject(WalkStore);
  });

  it('initialises isLoading as false', () => {
    expect(store.isLoading()).toBe(false);
  })

  it('initialises selectedWalk as null', () => {
    expect(store.selectedWalk()).toBeNull();
  })

  it('should dispatch load event when fetchWalks is called', () => {
    store.fetchWalks();
    expect(mockDispatcher.dispatch).toHaveBeenCalledWith(walkEvents.load());
  });

})
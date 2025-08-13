import { TestBed } from "@angular/core/testing"
import { WalkStore } from "./walks.store"
import { provideHttpClient } from "@angular/common/http";

describe('Walk Store', () => {
  let store: InstanceType<typeof WalkStore>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalkStore, provideHttpClient()]
    });

    store = TestBed.inject(WalkStore) ;
  });

  it('initialises isLoading as false', () => {
    expect(store.isLoading()).toBe(false);
  })

  it('initialises selectedWalk as null', () => {
    expect(store.selectedWalk()).toBeNull();
  })
})
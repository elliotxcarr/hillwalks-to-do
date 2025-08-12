import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalkItemComponent } from './walk-item.component';

describe('WalkItemComponent', () => {
  let component: WalkItemComponent;
  let fixture: ComponentFixture<WalkItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalkItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

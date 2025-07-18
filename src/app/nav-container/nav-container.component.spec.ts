import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavContainerComponent } from './nav-container.component';
import { provideHttpClient } from '@angular/common/http';

describe('NavContainerComponent', () => {
  let component: NavContainerComponent;
  let fixture: ComponentFixture<NavContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavContainerComponent],
      providers:[
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

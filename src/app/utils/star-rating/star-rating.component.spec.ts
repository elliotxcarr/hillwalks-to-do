import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRatingComponent } from './star-rating.component';
import { provideHttpClient } from '@angular/common/http';
import { Walk } from '../../models/Walk';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;
  let currentWalk = {
      _id: '1',
      name: 'Name',
      location: 'Location',
      difficulty: 3,
      rating: 4,
      startPoint: 'Start Point',
      hillType: 'Munro',
      image: 'image Url',
      duration: '4 Hours',
      bogFactor: 3,
      distance: 1,
      completed: false
    };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarRatingComponent],
      providers:[
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    component.currentWalk = currentWalk
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach } from 'vitest';
import { WalkItemComponent } from './walk-item.component';
import { provideHttpClient } from '@angular/common/http';
import { Walk } from '../../models/Walk';

describe('WalkItemComponent', () => {
  let component: WalkItemComponent;
  let fixture: ComponentFixture<WalkItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalkItemComponent],
      providers:[
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalkItemComponent);
    component = fixture.componentInstance;
    component.walk = {
      _id: '1',
      name: 'Walk Example',
      location: 'Newburgh',
      difficulty: 3,
      duration: "10 hours",
      rating: 5,
      hillType: 'Munro',
      distance: 500,
      startPoint: 'Example Car Park',
      image: 'image.png',
      completed: true,
    } as Walk
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Testing getDifficultyColour',()=>{
    it('returns text-green-700 when difficulty = 2', ()=>{
      let difficulty = 2;
      expect(component.getDifficultyColour(difficulty)).toBe('text-green-700')
    });
    it('returns an empty string when difficulty does not match criteria',()=>{
      let difficulty  = 9;
      expect(component.getDifficultyColour(difficulty)).toBe('')
    });
  });
});

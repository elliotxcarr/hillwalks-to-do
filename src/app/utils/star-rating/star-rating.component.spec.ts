import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { describe, it, beforeEach } from 'vitest';
import { StarRatingComponent } from './star-rating.component';
import { provideHttpClient } from '@angular/common/http';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays 5 stars when rating is 5', () => {
    component.rating = 5;
    fixture.detectChanges()
    let text = fixture.nativeElement.querySelector('#star-rating');
    expect(text.textContent).toEqual(' ★  ★  ★  ★  ★ ')
  });

  it('displays 2 stars when rating is 2', () => {
    component.rating = 2;
    fixture.detectChanges()
    let text = fixture.nativeElement.querySelector('#star-rating');
    expect(text.textContent).toEqual(' ★  ★  ☆  ☆  ☆ ')
  });
});

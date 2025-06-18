import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListComponent } from './item-list.component';
import { provideHttpClient } from '@angular/common/http';

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemListComponent],
      providers:[
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, beforeEach } from 'vitest';
import { DetailsPanelComponent } from './details-panel.component';
import { provideHttpClient } from '@angular/common/http';

describe('DetailsPanelComponent', () => {
  let component: DetailsPanelComponent;
  let fixture: ComponentFixture<DetailsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsPanelComponent],
      providers:[
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

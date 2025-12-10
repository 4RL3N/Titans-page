import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitanCardComponent } from './titan-card.component';

describe('TitanCard', () => {
  let component: TitanCardComponent;
  let fixture: ComponentFixture<TitanCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitanCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatgorieFrontComponent } from './catgorie-front.component';

describe('CatgorieFrontComponent', () => {
  let component: CatgorieFrontComponent;
  let fixture: ComponentFixture<CatgorieFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatgorieFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatgorieFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

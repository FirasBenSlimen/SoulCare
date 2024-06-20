import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontAllComponent } from './front-all.component';

describe('FrontAllComponent', () => {
  let component: FrontAllComponent;
  let fixture: ComponentFixture<FrontAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrontAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

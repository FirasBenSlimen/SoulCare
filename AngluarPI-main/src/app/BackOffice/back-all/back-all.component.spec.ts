import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackAllComponent } from './back-all.component';

describe('BackAllComponent', () => {
  let component: BackAllComponent;
  let fixture: ComponentFixture<BackAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

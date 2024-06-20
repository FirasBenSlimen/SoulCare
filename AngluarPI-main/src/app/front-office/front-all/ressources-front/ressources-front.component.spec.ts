import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourcesFrontComponent } from './ressources-front.component';

describe('RessourcesFrontComponent', () => {
  let component: RessourcesFrontComponent;
  let fixture: ComponentFixture<RessourcesFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RessourcesFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RessourcesFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

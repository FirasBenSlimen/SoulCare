import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetDetailComponent } from './projet-dtail.component';

describe('ProjetDtailComponent', () => {
  let component: ProjetDetailComponent;
  let fixture: ComponentFixture<ProjetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

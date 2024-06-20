import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRessouceComponent } from './ajout-ressouce.component';

describe('AjoutRessouceComponent', () => {
  let component: AjoutRessouceComponent;
  let fixture: ComponentFixture<AjoutRessouceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutRessouceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutRessouceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

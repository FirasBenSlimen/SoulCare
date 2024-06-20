import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterreclamationComponent } from './ajouterreclamation.component';

describe('AjouterreclamationComponent', () => {
  let component: AjouterreclamationComponent;
  let fixture: ComponentFixture<AjouterreclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterreclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterreclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

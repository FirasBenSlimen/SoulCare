import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRessourceComponent } from './modify-ressource.component';

describe('ModifyRessourceComponent', () => {
  let component: ModifyRessourceComponent;
  let fixture: ComponentFixture<ModifyRessourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyRessourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

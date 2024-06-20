import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdesreclamationComponent } from './listdesreclamation.component';

describe('ListdesreclamationComponent', () => {
  let component: ListdesreclamationComponent;
  let fixture: ComponentFixture<ListdesreclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListdesreclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListdesreclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

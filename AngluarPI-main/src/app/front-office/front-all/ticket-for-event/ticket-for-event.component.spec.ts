import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketForEventComponent } from './ticket-for-event.component';

describe('TicketForEventComponent', () => {
  let component: TicketForEventComponent;
  let fixture: ComponentFixture<TicketForEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketForEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketForEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

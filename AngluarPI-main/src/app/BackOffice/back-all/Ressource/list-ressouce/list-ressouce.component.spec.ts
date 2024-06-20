import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRessouceComponent } from './list-ressouce.component';

describe('ListRessouceComponent', () => {
  let component: ListRessouceComponent;
  let fixture: ComponentFixture<ListRessouceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRessouceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRessouceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

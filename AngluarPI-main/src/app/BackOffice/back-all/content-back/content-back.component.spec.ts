import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBackComponent } from './content-back.component';

describe('ContentBackComponent', () => {
  let component: ContentBackComponent;
  let fixture: ComponentFixture<ContentBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

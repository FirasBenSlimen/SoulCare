import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsFrontComponent } from './posts-front.component';

describe('PostsFrontComponent', () => {
  let component: PostsFrontComponent;
  let fixture: ComponentFixture<PostsFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

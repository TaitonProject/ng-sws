import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwsInputComponent } from './sws-input.component';

describe('SwsInputComponent', () => {
  let component: SwsInputComponent;
  let fixture: ComponentFixture<SwsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

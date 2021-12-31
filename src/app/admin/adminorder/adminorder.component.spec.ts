import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminorderComponent } from './adminorder.component';

describe('AdminorderComponent', () => {
  let component: AdminorderComponent;
  let fixture: ComponentFixture<AdminorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

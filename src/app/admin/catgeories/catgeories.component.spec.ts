import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatgeoriesComponent } from './catgeories.component';

describe('CatgeoriesComponent', () => {
  let component: CatgeoriesComponent;
  let fixture: ComponentFixture<CatgeoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatgeoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatgeoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

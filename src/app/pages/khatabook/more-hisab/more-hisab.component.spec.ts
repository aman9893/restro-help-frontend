import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreHisabComponent } from './more-hisab.component';

describe('MoreHisabComponent', () => {
  let component: MoreHisabComponent;
  let fixture: ComponentFixture<MoreHisabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreHisabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreHisabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

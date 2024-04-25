import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddkhataAmtComponent } from './addkhata-amt.component';

describe('AddkhataAmtComponent', () => {
  let component: AddkhataAmtComponent;
  let fixture: ComponentFixture<AddkhataAmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddkhataAmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddkhataAmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

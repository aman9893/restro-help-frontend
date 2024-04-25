import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKhataComponent } from './add-khata.component';

describe('AddKhataComponent', () => {
  let component: AddKhataComponent;
  let fixture: ComponentFixture<AddKhataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKhataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKhataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

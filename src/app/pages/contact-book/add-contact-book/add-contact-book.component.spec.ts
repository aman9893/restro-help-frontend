import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactBookComponent } from './add-contact-book.component';

describe('AddContactBookComponent', () => {
  let component: AddContactBookComponent;
  let fixture: ComponentFixture<AddContactBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContactBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContactBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

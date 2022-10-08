import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContactBookComponent } from './list-contact-book.component';

describe('ListContactBookComponent', () => {
  let component: ListContactBookComponent;
  let fixture: ComponentFixture<ListContactBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContactBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContactBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

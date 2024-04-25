import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListKhataComponent } from './list-khata.component';

describe('ListKhataComponent', () => {
  let component: ListKhataComponent;
  let fixture: ComponentFixture<ListKhataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListKhataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListKhataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

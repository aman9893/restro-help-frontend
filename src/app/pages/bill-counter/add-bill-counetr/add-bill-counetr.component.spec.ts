import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillCounetrComponent } from './add-bill-counetr.component';

describe('AddBillCounetrComponent', () => {
  let component: AddBillCounetrComponent;
  let fixture: ComponentFixture<AddBillCounetrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBillCounetrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBillCounetrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrimBoxComponent } from './confrim-box.component';

describe('ConfrimBoxComponent', () => {
  let component: ConfrimBoxComponent;
  let fixture: ComponentFixture<ConfrimBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfrimBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfrimBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

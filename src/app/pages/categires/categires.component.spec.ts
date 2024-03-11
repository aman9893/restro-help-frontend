import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategiresComponent } from './categires.component';

describe('CategiresComponent', () => {
  let component: CategiresComponent;
  let fixture: ComponentFixture<CategiresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategiresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

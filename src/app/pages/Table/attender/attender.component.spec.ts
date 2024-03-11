import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttenderComponent } from './attender.component';

describe('AttenderComponent', () => {
  let component: AttenderComponent;
  let fixture: ComponentFixture<AttenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

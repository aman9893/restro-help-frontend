import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelprequestComponent } from './helprequest.component';

describe('HelprequestComponent', () => {
  let component: HelprequestComponent;
  let fixture: ComponentFixture<HelprequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelprequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelprequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchpipeComponent } from './searchpipe.component';

describe('SearchpipeComponent', () => {
  let component: SearchpipeComponent;
  let fixture: ComponentFixture<SearchpipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchpipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchpipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

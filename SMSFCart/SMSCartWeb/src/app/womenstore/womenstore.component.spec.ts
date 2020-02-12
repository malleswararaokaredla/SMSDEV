import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WomenstoreComponent } from './womenstore.component';

describe('WomenstoreComponent', () => {
  let component: WomenstoreComponent;
  let fixture: ComponentFixture<WomenstoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WomenstoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WomenstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

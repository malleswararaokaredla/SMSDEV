import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KurtisComponent } from './kurtis.component';

describe('KurtisComponent', () => {
  let component: KurtisComponent;
  let fixture: ComponentFixture<KurtisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KurtisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KurtisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

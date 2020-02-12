import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenitemdescComponent } from './venitemdesc.component';

describe('VenitemdescComponent', () => {
  let component: VenitemdescComponent;
  let fixture: ComponentFixture<VenitemdescComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenitemdescComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenitemdescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

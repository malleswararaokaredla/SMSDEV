import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenitemaddComponent } from './venitemadd.component';

describe('VenitemaddComponent', () => {
  let component: VenitemaddComponent;
  let fixture: ComponentFixture<VenitemaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenitemaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenitemaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

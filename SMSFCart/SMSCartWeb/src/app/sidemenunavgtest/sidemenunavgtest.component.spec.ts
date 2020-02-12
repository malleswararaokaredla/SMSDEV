import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidemenunavgtestComponent } from './sidemenunavgtest.component';

describe('SidemenunavgtestComponent', () => {
  let component: SidemenunavgtestComponent;
  let fixture: ComponentFixture<SidemenunavgtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidemenunavgtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenunavgtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

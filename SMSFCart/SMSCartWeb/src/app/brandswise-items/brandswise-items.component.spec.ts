import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandswiseItemsComponent } from './brandswise-items.component';

describe('BrandswiseItemsComponent', () => {
  let component: BrandswiseItemsComponent;
  let fixture: ComponentFixture<BrandswiseItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandswiseItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandswiseItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

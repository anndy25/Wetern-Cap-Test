import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLogActionComponent } from './sales-log-action.component';

describe('SalesLogActionComponent', () => {
  let component: SalesLogActionComponent;
  let fixture: ComponentFixture<SalesLogActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesLogActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesLogActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

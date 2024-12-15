import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLogListComponent } from './sales-log-list.component';

describe('SalesLogListComponent', () => {
  let component: SalesLogListComponent;
  let fixture: ComponentFixture<SalesLogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesLogListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

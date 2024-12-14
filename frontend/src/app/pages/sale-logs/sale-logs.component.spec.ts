import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleLogsComponent } from './sale-logs.component';

describe('SaleLogsComponent', () => {
  let component: SaleLogsComponent;
  let fixture: ComponentFixture<SaleLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

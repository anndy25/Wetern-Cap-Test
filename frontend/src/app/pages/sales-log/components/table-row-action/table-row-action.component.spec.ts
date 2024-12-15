import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowActionComponent } from './table-row-action.component';

describe('TableRowActionComponent', () => {
  let component: TableRowActionComponent;
  let fixture: ComponentFixture<TableRowActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableRowActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRowActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

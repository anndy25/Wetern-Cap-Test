import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RowActionsSet } from '../../enum/sales-log.eum';

@Component({
  selector: 'app-table-row-action',
  standalone: false,
  templateUrl: './table-row-action.component.html',
  styleUrl: './table-row-action.component.scss',
})
export class TableRowActionComponent {
  @Input() status = 'Closed';
  @Output() selectedMenuItem = new EventEmitter<number>();

  rowActions = RowActionsSet;

  onMenuClick(item: RowActionsSet) {
    this.selectedMenuItem.emit(item);
  }
}

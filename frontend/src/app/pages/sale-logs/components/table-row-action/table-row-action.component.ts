import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-row-action',
  standalone: false,
  templateUrl: './table-row-action.component.html',
  styleUrl: './table-row-action.component.scss',
})
export class TableRowActionComponent {
  @Input() status = 'Closed';
}

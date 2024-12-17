import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ColumnIds,
  ColumnNames,
} from '../../pages/sales-log/enum/sales-log.eum';
import moment from 'moment';

@Component({
  selector: 'app-filter-card-list',
  standalone: false,
  templateUrl: './filter-card-list.component.html',
  styleUrl: './filter-card-list.component.scss',
})
export class FilterCardListComponent implements OnInit {
  @Input() columnId = '';
  @Input() filters: any = [];
  @Output() removedFilter = new EventEmitter<string | number>();
  colId = ColumnIds;
  columnNames = ColumnNames;
  dateStringValue = '';

  ngOnInit(): void {
    if (this.columnId === ColumnIds.DATE && this.filters[0].length) {
      this.dateStringValue = moment(this.filters[0]).format('D MMM YYYY');
      if (this.filters[1].length) {
        this.dateStringValue = `${this.dateStringValue} - ${moment(
          this.filters[1]
        ).format('D MMM YYYY')}`;
      }
    }
  }
}

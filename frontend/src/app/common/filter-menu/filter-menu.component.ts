import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FilterOption } from '../../interfaces/filter-menu.interface';
import { SortingOrder } from '../../pages/sales-log/interface/sales-log.interface';

@Component({
  selector: 'app-filter-menu',
  standalone: false,
  templateUrl: './filter-menu.component.html',
})
export class FilterMenuComponent implements OnChanges {
  @Input() label = '';
  @Input() enableSort = false;
  @Input() options: FilterOption[] = [];
  @Input() defaultOptions: FilterOption[] = [];
  @Input() sortBy = false;
  @Output() closeFilterMenu = new EventEmitter<FilterOption[]>();
  @Output() sortByChanged = new EventEmitter<SortingOrder>();
  selectedItems = new Set<number | string>();
  sortingOrder = SortingOrder.ASC;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultOptions'] && !changes['defaultOptions'].firstChange) {
      const defaultOptions = changes['defaultOptions'].currentValue;

      if (Array.isArray(defaultOptions)) {
        defaultOptions.forEach((element) => {
          if (element && element.value != null) {
            this.selectedItems.add(element.value);
          }
        });
      }
    }
    if (changes['sortBy'] && !changes['sortBy']?.firstChange) {
      if (!changes['sortBy'].currentValue) {
        this.sortingOrder = SortingOrder.ASC;
      }
    }
  }

  onCheckboxChange(value: number | string) {
    if (this.selectedItems.has(value)) {
      this.selectedItems.delete(value);
    } else {
      this.selectedItems.add(value);
    }
  }

  onMenuClosed() {
    const responseArray: FilterOption[] = [];
    let counter = this.selectedItems.size;

    for (let index = 0; index < this.options.length && counter > 0; index++) {
      if (this.selectedItems.has(this.options[index].value)) {
        counter--;
        responseArray.push({
          label: this.options?.[index].label,
          value: this.options?.[index].value,
        });
      }
    }
    this.closeFilterMenu.emit(responseArray);
  }

  onSortingOrderChanged() {
    this.sortingOrder =
      this.sortBy && this.sortingOrder === SortingOrder.ASC
        ? SortingOrder.DES
        : SortingOrder.ASC;

    this.sortByChanged.emit(this.sortingOrder);
  }
}

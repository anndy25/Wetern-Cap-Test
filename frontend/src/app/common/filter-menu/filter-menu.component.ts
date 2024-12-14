import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterOption } from '../../interfaces/filter-menu.interface';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-filter-menu',
  standalone: false,
  templateUrl: './filter-menu.component.html',
})
export class FilterMenuComponent {
  @Input() label = '';
  @Input() enableSort = false;
  @Input() options: FilterOption[] | undefined;

  @Output() onClosed = new EventEmitter<FilterOption[]>();
  selectedItemsIndex = new Set<number>();

  onCheckboxChange(index: number) {
    if (this.selectedItemsIndex.has(index)) {
      this.selectedItemsIndex.delete(index);
    } else {
      this.selectedItemsIndex.add(index);
    }
  }

  onMenuClosed() {
    const responseArray: FilterOption[] = [];
    this.selectedItemsIndex.forEach((index) =>
      responseArray.push({
        label: this.options?.[index].label ?? '',
        value: this.options?.[index].value ?? '',
      })
    );

    this.onClosed.emit(responseArray);
  }
}

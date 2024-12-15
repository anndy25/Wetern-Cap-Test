import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FilterOption } from '../../interfaces/filter-menu.interface';

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

  @Output() onClosed = new EventEmitter<FilterOption[]>();
  selectedItems = new Set<number | string>();

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

    this.onClosed.emit(responseArray);
  }
}

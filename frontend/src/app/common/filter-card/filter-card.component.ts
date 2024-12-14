import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-card',
  standalone: false,
  templateUrl: './filter-card.component.html',
  styleUrl: './filter-card.component.scss',
})
export class FilterCardComponent {
  @Input() columnName = '';
  @Input() filter = '';
}

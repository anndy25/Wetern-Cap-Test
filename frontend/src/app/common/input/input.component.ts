import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: false,
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() type = 'text';
  @Input() bgColor = '';
  @Input() placeHolder = '';
  @Input() customClass = '';
}

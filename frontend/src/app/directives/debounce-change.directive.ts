import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Directive({
  selector: '[debounceChange]',
  standalone: false,
})
export class DebounceChangeDirective {
  private debounceSubject = new Subject<string>();

  @Output() debouncedInputChange = new EventEmitter<string>();
  @Input() debounceDelay = 300; // Better naming choice

  constructor() {
    this.debounceSubject
      .pipe(debounceTime(this.debounceDelay))
      .subscribe((value) => {
        this.debouncedInputChange.emit(value);
      });
  }

  @HostListener('input', ['$event.target.value'])
  onInputChange(value: string) {
    this.debounceSubject.next(value);
  }
}

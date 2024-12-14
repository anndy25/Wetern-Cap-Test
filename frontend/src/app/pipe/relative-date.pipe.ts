import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate',
  standalone: false,
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: Date | string | number): string {
    const inputDate = new Date(value); // Convert input to a Date object
    const today = new Date(); // Current date

    // Remove time part from the dates to compare days only
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    const diffInTime = inputDate.getTime() - today.getTime();
    const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24)); // Difference in days

    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays > 0) {
      return diffInDays === 1 ? 'In 1 day' : `In ${diffInDays} days`;
    } else {
      return diffInDays === -1
        ? '1 day ago'
        : `${Math.abs(diffInDays)} days ago`;
    }
  }
}

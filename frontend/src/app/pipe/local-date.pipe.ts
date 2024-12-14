import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'localDateTime',
})
export class LocalDateTimePipe implements PipeTransform {
  defaultFormate = 'D MMM, YYYY';
  transform(date: string, formate?: any) {
    return moment(date)
      .local()
      .format(formate ?? this.defaultFormate);
  }
}

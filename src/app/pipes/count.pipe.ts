import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countPipe'
})
export class CountPipe implements PipeTransform {

  transform(value: number): any {
    if (value < 10) {
      return '0' + value;
    }
    return value;
  }

}

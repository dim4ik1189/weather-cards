import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCelsius'
})
export class ToCelsiusPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): unknown {
    return Math.floor((value - 32) * 5 / 9);
  }

}

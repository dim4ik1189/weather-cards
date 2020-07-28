import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempPipe'
})
export class TempPipePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return Math.floor(value - 273.15);
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsius'
})
export class CelsiusPipe implements PipeTransform {

  transform( fahrenheitDegree: number, returnToFahrenheit: boolean = false ): any {
    if ( returnToFahrenheit ) return fahrenheitDegree;
    else return Math.round( (5/9) * (fahrenheitDegree - 32) );
  }

}

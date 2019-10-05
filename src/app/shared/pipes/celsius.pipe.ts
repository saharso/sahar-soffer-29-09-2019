import { Pipe, PipeTransform } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from '../redux/store';
import { DegUnit } from '../models/degUnit.model';

@Pipe({
  name: 'celsiusFarenHeitToggler'
})
export class CelsiusFarenheitPipe implements PipeTransform {

  constructor(
    private ngRedux: NgRedux<AppState>,
  ){}

  transform( fahrenheitDegree: number, toggler: DegUnit ): any {
    if ( toggler === 'fahrenheit' ) return fahrenheitDegree;
    else return Math.round( (5/9) * (fahrenheitDegree - 32) );
  }

}

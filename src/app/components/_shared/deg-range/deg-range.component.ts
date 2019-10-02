import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/shared/redux/store';

@Component({
  selector: 'hwt-deg-range',
  templateUrl: './deg-range.component.html',
  styleUrls: ['./deg-range.component.scss']
})
export class DegRangeComponent implements OnInit {

  @Input() minValue: number;
  @Input() maxValue: number;

  get keepFahrenheit(){
    return this.ngRedux.getState().ui_degreeUnits !== 'celsius';
  }
  constructor(
    private ngRedux: NgRedux<AppState>,
  ) { }

  ngOnInit() {
  }

}

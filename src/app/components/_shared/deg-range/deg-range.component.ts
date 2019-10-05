import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/shared/redux/store';
import { DegUnit } from 'src/app/shared/models/degUnit.model';

@Component({
  selector: 'hwt-deg-range',
  templateUrl: './deg-range.component.html',
  styleUrls: ['./deg-range.component.scss']
})
export class DegRangeComponent implements OnInit {

  @Input() minValue: number;
  @Input() maxValue: number;

  get degUnit(): DegUnit {
    return this.ngRedux.getState().ui_degreeUnits;
  }
  constructor(
    private ngRedux: NgRedux<AppState>,
  ) { }

  ngOnInit() {
  }

}

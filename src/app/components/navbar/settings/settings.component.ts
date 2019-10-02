import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';
import { DegUnit } from '../../../shared/models/degUnit.model';

@Component({
  selector: 'hwt-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  currentDegUnig: DegUnit;
  @Output() onSelect = new EventEmitter();
  constructor(
    private ngRedux: NgRedux<AppState>,
  ) {}

  ngOnInit() {
    this.currentDegUnig = this.ngRedux.getState().ui_degreeUnits;
  }


}

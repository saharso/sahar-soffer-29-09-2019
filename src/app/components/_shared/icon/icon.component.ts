import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from 'src/app/shared/redux/store';

@Component({
  selector: 'hwt-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() icon: string;
  @Input() alt: string;
  iconUrl: string;
  
  constructor(
    private ngRedux: NgRedux<AppState>,
  ) { 
    this.iconUrl = this.ngRedux.getState().iconUrl;
  }

  ngOnInit() {
  }

}

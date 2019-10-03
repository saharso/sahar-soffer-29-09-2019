import { Component, OnInit, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';

@Component({
  selector: 'hwt-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  @ViewChild( 'mainContainer' ) mainContainer: ElementRef;

  @HostBinding( 'class.c-mainContainer' ) alwaysTrue: boolean = true;
  @HostBinding( 'class.is-darkMode' ) get isDarkMode(){
    return this.ngRedux.getState().ui_isDarkMode;
  }
  get isSideViewOpen(): boolean {
    return this.ngRedux.getState().ui_isSidebarOpen;
  }
  
  constructor(
    private ngRedux: NgRedux<AppState>,
  ){}

  ngOnInit(){}
    
}

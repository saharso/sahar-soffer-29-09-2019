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
  isSideViewOpen: boolean;
  constructor(
    private ngRedux: NgRedux<AppState>,
  ){}

  ngOnInit(){}
  
  ngAfterContentInit(){
    this.ngRedux.getState()._containers[ 'mainContainer' ] = this.mainContainer;

    this.ngRedux.subscribe(()=>{
      const appState = this.ngRedux.getState();
      switch( appState._currentAction ){
        case actionList.UI__TOGGLE_SIDEBAR_VIEW :
          this.isSideViewOpen = appState.ui_isSidebarOpen;
          console.log(this.isSideViewOpen)
        break;
      }
    })

  }



}

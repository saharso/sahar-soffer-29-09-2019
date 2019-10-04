import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';
import { DegUnit } from 'src/app/shared/models/degUnit.model';

@Component({
  selector: 'hwt-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  toggleSettings: boolean = false;
  toggleMobileMenu: boolean = false;
  @ViewChild( 'mobileMenu' ) mobileMenu: ElementRef;
  constructor(
    private ngRedux: NgRedux<AppState>
  ) { }

  ngOnInit() {}
  
  toggleDegUnit( degUnit: DegUnit ){
    this.ngRedux.dispatch({
      type: actionList.UI__SET_DEGREE_UNIT,
      data: degUnit,
    });
    this.closeSidebar();
  }
  
  toggleDarkmode( isDarkMode: boolean ){
    this.ngRedux.dispatch({
      type: actionList.UI__TOGGLE_DARK_MODE,
      data: isDarkMode,
    });
    localStorage.setItem( 'darkMode', isDarkMode ? '1' : '0' );
    this.closeSidebar();
  }

  closeSidebar(){
    this.ngRedux.dispatch({
      type: actionList.UI__TOGGLE_SIDEBAR_VIEW,
      data: false,
    })
  }

}

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

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.setMobileMenuHeight();
    window.addEventListener('resize',this.setMobileMenuHeight.bind( this ));
  }
  
  setMobileMenuHeight(){
    const menu = this.mobileMenu.nativeElement;
    if ( ! menu ) return;
    if( this.isMobile() ) {
      menu.style.height = document.body.clientHeight - menu.getBoundingClientRect().top + 'px';
    } else {
      menu.style.height = '';
    }
  }

  isMobile(): boolean {
    const menu = this.mobileMenu.nativeElement;
    return window.getComputedStyle( menu ).getPropertyValue('position') === 'absolute';
  }

  toggleDegUnit( degUnit: DegUnit ){
    this.ngRedux.dispatch({
      type: actionList.UI__SET_DEGREE_UNIT,
      data: degUnit,
    });
  }
  
  toggleDarkmode( isDarkMode: boolean ){
    this.ngRedux.dispatch({
      type: actionList.UI__TOGGLE_DARK_MODE,
      data: isDarkMode,
    });
  }

}

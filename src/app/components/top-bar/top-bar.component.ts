import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';
import { LocationItem } from 'src/app/shared/models/location.model';
import { CurrentWeather } from 'src/app/shared/models/current-weather.model';

@Component({
  selector: 'hwt-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  currentLocation: LocationItem;
  currentWeather: CurrentWeather;
  @Output() onToggleSideView = new EventEmitter<boolean>();
  isSideOpen: boolean = false;
  @ViewChild( 'headerTitle' ) headerTitle: ElementRef;
  
  constructor(
    private ngRedux: NgRedux<AppState>,
  ) { }


  ngOnInit() {
    this.ngRedux.subscribe(()=>{
      const appState = this.ngRedux.getState();
      switch( appState._currentAction ){
        case actionList.GET_CURRENT_WEATHER :
          this.currentWeather = Object.assign( appState.currentWeather, this.currentLocation );
        break;

      }
    })

    this.currentLocation = this.ngRedux.getState().chosenLocation;
  }

  ngAfterContentInit(){
    const mainContainer = this.ngRedux.getState()._containers.mainContainer;
    mainContainer &&  mainContainer.nativeElement.addEventListener('scroll', this.headerScrollEffect.bind( this, mainContainer.nativeElement ))
  }
  toggleSidebarView(){
    this.isSideOpen = ! this.isSideOpen;
    this.ngRedux.dispatch( { type: actionList.UI__TOGGLE_SIDEBAR_VIEW, data: this.isSideOpen } );
  }

  getAutoCompleteResults( query: LocationItem ){
    this.currentLocation = query;
    this.ngRedux.dispatch({
      type: actionList.GET_SEARCH_QUERY,
      data: this.currentLocation,
    })
  }

  headerScrollEffect( mainContainer ){
    let mainContainerScrollPos = mainContainer.scrollTop;
    const headerTitle = this.headerTitle.nativeElement;
    if ( ! headerTitle ) return;
    if( this.isMobile() ) {
      const refHeight = headerTitle.querySelector('.c-header-title').offsetHeight;
      const formula = mainContainerScrollPos <= refHeight ? mainContainerScrollPos : refHeight;
      headerTitle.style.marginTop = - formula + 'px';
      mainContainer.style.paddingBottom = formula + 'px';
    } else {
      headerTitle.style.marginTop = '';
      mainContainer.tyle.paddingBottom = ';'
    }
  }
  isMobile(): boolean {
    return true;
    //const menu = this.mobileMenu.nativeElement;
    //return window.getComputedStyle( menu ).getPropertyValue('position') === 'absolute';
  }


}

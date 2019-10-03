import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, HostBinding } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';
import { LocationItem } from 'src/app/shared/models/location.model';

@Component({
  selector: 'hwt-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  currentLocation: LocationItem;
  _isSideOpen: boolean;
  get isSideOpen(): boolean {
    const isSidebarOpen = this.ngRedux.getState().ui_isSidebarOpen;
    return isSidebarOpen;
  };
  @Output() onToggleSideView = new EventEmitter<boolean>();
  @ViewChild( 'headerTitle' ) headerTitle: ElementRef;
  @HostBinding( 'class.is-searhOpen' ) isSearchOpen: boolean = false;
  
  constructor(
    private ngRedux: NgRedux<AppState>,
  ) { }


  ngOnInit() {}

  toggleSidebarView(){
    this.ngRedux.dispatch( { type: actionList.UI__TOGGLE_SIDEBAR_VIEW, data: ! this.isSideOpen } );
  }

  toggleMobileSearchView(){
    this.isSearchOpen = ! this.isSearchOpen;
  }

}

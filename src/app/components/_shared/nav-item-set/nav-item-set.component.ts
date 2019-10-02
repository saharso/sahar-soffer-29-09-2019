import { Component, OnInit, QueryList, ContentChildren } from '@angular/core';
import { NavItemComponent } from '../nav-item/nav-item.component';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';

@Component({
  selector: 'hwt-nav-item-set',
  templateUrl: './nav-item-set.component.html',
  styleUrls: ['./nav-item-set.component.scss']
})
export class NavItemSetComponent implements OnInit {

  @ContentChildren( NavItemComponent, {descendants: true} ) children: QueryList<NavItemComponent>;

  constructor(
    private ngRedux: NgRedux<AppState>,
  ) { }

  ngOnInit() {
    
    this.ngRedux.subscribe(()=>{
      const appState = this.ngRedux.getState();
      switch( appState._currentAction ){
        case actionList.UI__SELECT_NAV_ITEM :
          this.setActive( appState.ui_selectedNavItem );
        break;
      }
    }) 
  }

  ngAfterContentInit(){
    requestAnimationFrame(()=>{
      this.setFirstAsDefault();
    })
  }

  setActive( active: NavItemComponent ){
    if( ! this.children.toArray().find( item => item === active ) ) return;
    this.children.forEach(( item: NavItemComponent ) => {
      item.isActive = item === active;
    })
  }

  setFirstAsDefault(){
    this.children.forEach(( item: NavItemComponent, index ) => {
      item.isActive = index === 0;
    })
  }

}

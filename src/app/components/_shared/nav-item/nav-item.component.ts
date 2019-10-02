import { Component, OnInit, Input, Output, EventEmitter, Host } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';

@Component({
  selector: 'hwt-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {

  @Input() icon: string;
  @Input() label: string;
  @Input() link: string;
  @Input() data: any;
  @Output() onClick = new EventEmitter<MouseEvent>();
  isActive: boolean;
  labelFirstLatter: string;


  constructor( 
    private ngRedux: NgRedux<AppState>,
  ) { }

  ngOnInit() {
    this.labelFirstLatter = this.label ? this.label[0].toUpperCase() : '';
  }

  onNavItemClick( $event: MouseEvent ){
    this.onClick.emit( $event );
    this.ngRedux.dispatch( {
      type: actionList.UI__SELECT_NAV_ITEM,
      data: this,
    })
  }
}

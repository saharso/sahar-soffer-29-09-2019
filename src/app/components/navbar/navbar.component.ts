import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'hwt-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  toggleSettings: boolean = false;
  toggleMobileMenu: boolean = false;
  @ViewChild( 'mobileMenu' ) mobileMenu: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.setMobileMenuHeight();
    window.addEventListener('resize',this.setMobileMenuHeight.bind( this ))
  }
  
  setMobileMenuHeight(){
    const menu = this.mobileMenu.nativeElement;
    if ( ! menu ) return;
    if( window.getComputedStyle( menu ).getPropertyValue('position') === 'absolute' ) {
      menu.style.height = document.body.clientHeight - menu.getBoundingClientRect().top + 'px';
    } else {
      menu.style.height = '';
    }

  }

}

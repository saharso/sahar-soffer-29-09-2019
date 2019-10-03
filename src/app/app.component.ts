import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from './shared/redux/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'herolo-test';
  
}


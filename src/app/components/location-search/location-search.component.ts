import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { LocationItem } from 'src/app/shared/models/location.model';
import { ServerRequest, RequestResult } from 'src/app/shared/models/server-request.model';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';
import { Router } from '@angular/router';

@Component({
  selector: 'hwt-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {
  
  defaultLocation: LocationItem;
  @Output() onAutoCompleteQuery = new EventEmitter<LocationItem>();
  autoCompleteQuery: LocationItem;  
  cityList: LocationItem[];
  requestResult: RequestResult;

  constructor(
    private dataService: DataService,
    private ngRedux: NgRedux<AppState>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.ngRedux.subscribe(()=>{
      const appState = this.ngRedux.getState();
      if( appState._currentAction === actionList.CHOOSE_LOCATION ){
        this.defaultLocation = this.ngRedux.getState().chosenLocation;
      }
    });
  }

  onUserChoice( userChoice: LocationItem ){
    this.ngRedux.dispatch( { type: actionList.CHOOSE_LOCATION, data: userChoice } );
    this.router.navigate( [ 'main' ] );
  }


  onAutoCompleteSearch( event ){
    // call auto complte service
    this.dataService.getAutoCompleteData( event.query ).subscribe(
      ( data )=>{
        this.cityList = data;
      } 
    )

  }

}

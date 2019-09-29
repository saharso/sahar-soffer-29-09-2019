import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { LocationItem } from 'src/app/shared/models/location.model';
import { ServerRequest, RequestResult } from 'src/app/shared/models/server-request.model';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';

@Component({
  selector: 'hwt-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {
  
  @Input() defaultLocation: LocationItem;
  @Output() onAutoCompleteQuery = new EventEmitter<LocationItem>();
  autoCompleteQuery: LocationItem;  
  cityList: LocationItem[];
  requestResult: RequestResult;

  constructor(
    private dataService: DataService,
    private ngRedux: NgRedux<AppState>,
  ) { }

  ngOnInit() {
    this.autoCompleteQuery = this.defaultLocation;
    this.ngRedux.subscribe(()=>{

    })
  }

  ngAfterContentInit(){
    console.log( this.autoCompleteQuery );

  }
  onUserChoice( userChoice: LocationItem ){
    console.log( userChoice )
    if( userChoice instanceof LocationItem ){
      this.onAutoCompleteQuery.emit( userChoice );
    }
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

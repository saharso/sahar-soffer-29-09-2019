import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { LocationItem } from 'src/app/shared/models/location.model';
import { CurrentWeather } from 'src/app/shared/models/current-weather.model';
import { ForeCast } from 'src/app/shared/models/forecast.model';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hwt-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  currentWeather: CurrentWeather;
  foreCast: ForeCast;
  currentLocation: LocationItem;
  isFavorite: boolean;
  keepFahrenheit: boolean;
  subscription: Subscription;
  favorites = new Set();
  locationFromRout: string;

  constructor(
    private dataService: DataService,
    private ngRedux: NgRedux<AppState>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.locationFromRout = this.route.snapshot.paramMap.get('key');
    console.log( this.locationFromRout );
    if ( ! this.locationFromRout ){
      this.getDefaultData();
    } else {
      this.getDataByRoute();
    }

    this.ngRedux.subscribe(()=>{
      const appState = this.ngRedux.getState();
      switch( appState._currentAction ){
        case actionList.GET_REQUEST_STATUS : 
          console.log( appState.serverRequest );
        break;
        case actionList.SET_DEGREE_UNIT :
          this.keepFahrenheit = appState.degreeUnits === 'fahrenheit';
        break;
        case actionList.GET_SEARCH_QUERY :
          this.subscription = this.dataService.getCurrentWeather( appState.chosenLocation.key ).subscribe();
          this.subscription = this.dataService.getForeCast( appState.chosenLocation.key ).subscribe();
        break;
        case actionList.GET_CURRENT_WEATHER :
          this.currentWeather = Object.assign( appState.currentWeather, this.currentLocation );
        break;
        case actionList.GET_FORECAST :
          this.foreCast = appState.foreCast;
        break;

      }
    })
  }

  ngONDestroy(){
    this.subscription.unsubscribe();
  }

  getDefaultData(){
    const appState = this.ngRedux.getState();
    this.currentLocation = this.ngRedux.getState().chosenLocation;
    this.subscription = this.dataService.getCurrentWeather( appState.chosenLocation.key ).subscribe();
    this.subscription = this.dataService.getForeCast( appState.chosenLocation.key ).subscribe();
  }

  getDataByRoute(){
    this.currentLocation = new LocationItem();
    this.currentLocation.key = decodeURI( this.route.snapshot.paramMap.get('key') );
    this.currentLocation.name = decodeURI( this.route.snapshot.paramMap.get('name') );
    this.subscription = this.dataService.getCurrentWeather( this.currentLocation.key ).subscribe();
    this.subscription = this.dataService.getForeCast( this.currentLocation.key ).subscribe();
  }

  getAutoCompleteResults( query: LocationItem ){
    this.currentLocation = query;
    this.ngRedux.dispatch({
      type: actionList.GET_SEARCH_QUERY,
      data: this.currentLocation,
    })
  }

  addToFavorites( event: CurrentWeather ){
    event.isFavorite = true;
    this.favorites.add( event );
    this.dispatchFavorites();
  }

  removeFromFavorites( event ){
    event.isFavorite = false;
    this.favorites.delete( event );
    this.dispatchFavorites();
  }

  private dispatchFavorites(){
    const favorites = Array.from( this.favorites );
    this.ngRedux.dispatch( {
      type: actionList.ADD_TO_FAVORITES,
      data: favorites,
    });
    localStorage.setItem('favorites', JSON.stringify( favorites ) );
    console.log( localStorage.getItem( 'favorites' ) );
  }

}

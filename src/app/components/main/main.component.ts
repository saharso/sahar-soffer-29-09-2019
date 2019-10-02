import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { LocationItem } from 'src/app/shared/models/location.model';
import { CurrentWeather } from 'src/app/shared/models/current-weather.model';
import { ForeCast } from 'src/app/shared/models/forecast.model';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from 'src/app/shared/services/favorites.service';

@Component({
  selector: 'hwt-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  get currentWeather(): CurrentWeather {
    return Object.assign( this.ngRedux.getState().currentWeather, this.currentLocation );
  }
  get foreCast(): ForeCast {
    return this.ngRedux.getState().foreCast;
  }

  currentLocation: LocationItem;
  isFavorite: boolean;
  keepFahrenheit: boolean;
  subscription: Subscription;
  locationFromRout: string;

  constructor(
    private dataService: DataService,
    private ngRedux: NgRedux<AppState>,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService,
  ) { }

  ngOnInit() {
    this.locationFromRout = this.route.snapshot.paramMap.get('key');
    if ( ! this.locationFromRout ){
      this.getDefaultData();
    } else {
      this.getDataByRoute();
    }
    this.subscription = this.dataService.getCurrentWeather( this.currentLocation.key ).subscribe();
    this.subscription = this.dataService.getForeCast( this.currentLocation.key ).subscribe();

    
    this.ngRedux.subscribe(()=>{
      console.log('wtf')
      const appState = this.ngRedux.getState();
      console.log(appState)
      switch( appState._currentAction ){
        case actionList.GET_REQUEST_STATUS : 
          console.log( appState.serverRequest );
        break;
        case actionList.UI__SET_DEGREE_UNIT :
          this.keepFahrenheit = appState.ui_degreeUnits === 'fahrenheit';
        break;
        case actionList.GET_SEARCH_QUERY :
          this.currentLocation = appState.chosenLocation;
          this.subscription = this.dataService.getCurrentWeather( appState.chosenLocation.key ).subscribe();
          this.subscription = this.dataService.getForeCast( appState.chosenLocation.key ).subscribe();
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
    //this.subscription = this.dataService.getForeCast( appState.chosenLocation.key ).subscribe();
  }

  getDataByRoute(){
    this.currentLocation = new LocationItem();
    this.currentLocation.key = decodeURI( this.route.snapshot.paramMap.get('key') );
    this.currentLocation.name = decodeURI( this.route.snapshot.paramMap.get('name') );
    this.subscription = this.dataService.getCurrentWeather( this.currentLocation.key ).subscribe();
   // this.subscription = this.dataService.getForeCast( this.currentLocation.key ).subscribe();
  }


  addToFavorites( event: CurrentWeather ){
    event.isFavorite = true;
    this.favoritesService.addToFavofites( event );
  }

  removeFromFavorites( event ){
    event.isFavorite = false;
    this.favoritesService.removeFromFavorites( event );
  }

}

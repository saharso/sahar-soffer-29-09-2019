import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from 'src/app/shared/redux/store';
import { CurrentWeather } from 'src/app/shared/models/current-weather.model';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'hwt-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favoriteList: CurrentWeather[] = [];

  constructor(
    private ngRedux: NgRedux<AppState>,
    private dataService: DataService,
  ) { }
  
  ngOnInit() {
    this.favoriteList = this.dataService.getFavorites();

    this.ngRedux.subscribe(()=>{
      const appState = this.ngRedux.getState();
      switch( appState._currentAction ){
        case actionList.GET_FORECAST :
          this.favoriteList = this.ngRedux.getState().favoriteList;
          console.log( this.favoriteList );
        break;
      }
    })
  }

}

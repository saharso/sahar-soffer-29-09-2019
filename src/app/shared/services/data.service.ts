import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, catchError, take } from "rxjs/operators";
import { LocationItem } from '../models/location.model';
import { NgRedux } from '@angular-redux/store';
import { AppState, actionList } from '../redux/store';
import { ServerRequest } from '../models/server-request.model';
import { CurrentWeather } from '../models/current-weather.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private ngRedux: NgRedux<AppState>,
  ) { 
    
  }
  private apiKey(){
    //return 'jhA7A51oWfnBgX2r0Q8Fs9vA2X1MWv1C';
    //return 'KbYovIoDjUtB9Mzpe3JLKCdreACHNGYE';
    return 'QArD9PBP0efjxevWZVbDe5LJzAfVrev3';
  }

  setDefaultSearch(){
    if( this.ngRedux.getState().chosenLocation ) return;
    const defaultValue: LocationItem = {
      key: '215854',
      name: 'Tel Aviv',
    }
    this.ngRedux.dispatch({
      type: actionList.CHOOSE_LOCATION,
      data: defaultValue,
    })
  }

  getAutoCompleteData( query: string ): Observable<any> {
    if( ! query ) return;
    const requestResult: ServerRequest = {
      id: actionList.CHOOSE_LOCATION,
      requestResult: 'loading'
    };
    this.dispatchServerRequest( requestResult );
    const url = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete';
    const params = new HttpParams()
      .set('q', query )
      .set('apikey', this.apiKey() );
    return this.http.get( url ,{ params } ).pipe(
      take( 1 ),
      map( ( data ) => { return this.extractAutoComplete( data, requestResult ) } ),
      catchError( (err) => { return this.handleError( err, 'search results', requestResult ) } )
    )
  }
  
  private extractAutoComplete( data, requestResult: ServerRequest ): LocationItem[] {
    if ( ! data ) return;
    const refined = data.map( ( rawItem ) => { 
      const locationItem: LocationItem = new LocationItem();
      locationItem.key = rawItem.Key;
      locationItem.name = rawItem.LocalizedName;
      return locationItem;
    } );

    this.ngRedux.dispatch({
      type: actionList.SEARCH_LOCATION,
      data: refined,
    });

    requestResult.requestResult = 'success';
    this.dispatchServerRequest( requestResult );
    
    return refined;
  }

  getCurrentWeather( locationKey: string ){
    //if ( ! locationKey ) return;
    const requestResult: ServerRequest = {
      id: actionList.GET_CURRENT_WEATHER,
      requestResult: 'loading'
    };
    this.dispatchServerRequest( requestResult );

    const url = 'https://dataservice.accuweather.com/currentconditions/v1/' + locationKey;
    const params = new HttpParams()
      .set('apikey', this.apiKey() );

    return this.http.get( url ,{ params } ).pipe(
      take( 1 ),
      map( ( data ) => { return this.extractCurrentWeather( data, requestResult ) } ),
      catchError( (err) => { return this.handleError( err, 'the current weather', requestResult ) } )
    )

  }

  private extractCurrentWeather( data, requestResult: ServerRequest ): CurrentWeather {
    const _data = data[0];

    this.ngRedux.dispatch({
      type: actionList.GET_CURRENT_WEATHER,
      data: _data,
    });
    requestResult.requestResult = 'success';
    this.dispatchServerRequest( requestResult );
    return _data;
  }

  getForeCast( locationKey: string ){
    if ( ! locationKey ) return;
    const requestResult: ServerRequest = {
      id: actionList.GET_FORECAST,
      requestResult: 'loading'
    };
    this.dispatchServerRequest( requestResult );
    const url = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/' + locationKey;
    const params = new HttpParams()
      .set('apikey', this.apiKey() );

    return this.http.get( url ,{ params } ).pipe(
      take( 1 ),
      map( ( data ) => { return this.extractForeCast( data, requestResult ) } ),
      catchError( (err) => { return this.handleError( err, 'the forecast', requestResult ) } )
    )

  }

  extractForeCast( data: any, requestResult: ServerRequest ){
    this.ngRedux.dispatch({
      type: actionList.GET_FORECAST,
      data: data,
    });
    requestResult.requestResult = 'success'
    this.dispatchServerRequest( requestResult );
    return data;
  }

  getGeoLocation(): void {

    let url = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search';
    const requestResult: ServerRequest = {
      id: actionList.GET_GEO_LOCATION,
      requestResult: 'loading'
    };

    let response = new Observable();
    const getPosition = (data)=>{
      const pos = data.coords.latitude + ',' + data.coords.longitude;
      const params = new HttpParams()
        .set('apikey', this.apiKey() )
        .set('q', pos );  
      this.http.get( url ,{ params } ).subscribe(
        (data)=>{
          this.extractLocation( data, requestResult )
        },
        (error)=>{
          this.handleError( error );
        }
      );
      return response;
    
    }
    (function (){
      navigator.geolocation.getCurrentPosition((d)=>d);
    })()

    navigator.geolocation.getCurrentPosition( getPosition );
  
  }

  private extractLocation( data: any, requestResult: ServerRequest ){
    this.ngRedux.dispatch({
      type: actionList.CHOOSE_LOCATION,
      data: {
        key: data.Key,
        name: data.LocalizedName,
      },
    });
    requestResult.requestResult = 'success';
    this.dispatchServerRequest( requestResult );
    return data;

  }

  private handleError( err, friendlyMessage: string = 'data from server', requestResult?: ServerRequest ){
    console.error( err );
    this.messageService.addAll(
      [
        { 
          severity: 'error',
          summary: err.statusText,
          detail: `Sorry, we couldn't get ${ friendlyMessage }. Please try again later.`,
          life: 4000,
          closable: true,
        },
      ]
    );
    requestResult.requestResult = 'error'
    this.dispatchServerRequest( requestResult );

    return [ err ];
  }

  private dispatchServerRequest ( result: ServerRequest ){
    this.ngRedux.dispatch({
      type: actionList.GET_REQUEST_STATUS,
      data: result,
    });
  }

  setCurrentWeather(){
    const currentWeather = this.ngRedux.getState().currentWeather;
    if( ! currentWeather ) return null;
    currentWeather.isFavorite = !! this.ngRedux.getState().favoriteList.find( e => e.key === currentWeather.key );
    Object.assign( currentWeather, this.ngRedux.getState().chosenLocation );
    return currentWeather;
  }

}


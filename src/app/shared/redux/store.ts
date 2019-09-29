import { ActionMethod } from './models/action-method';
import { Actions } from './models/actions';
import { DegUnit } from '../models/degUnit.model';
import { LocationItem } from '../models/location.model';
import { CurrentWeather } from '../models/current-weather.model';
import { ForeCast } from '../models/forecast.model';
import { ServerRequest } from '../models/server-request.model';

const updateState = ( state: AppState, action: ActionMethod, update: any ) => {
    const stateUpdate = Object.assign({},
        state,
        update,
        { 
            _currentAction: action.type,
        },
    );
    console.groupCollapsed('%c State '+ action.type + ' updated at ' + new Date(), 'color: lightblue' )
        console.log( stateUpdate );
    console.groupEnd();

    return stateUpdate;
}


export const actionList = Object.freeze( new Actions() );

export class AppState {
    _currentAction?: string;
    serverRequest?: ServerRequest = new ServerRequest();
    locationSearch?: LocationItem[];
    iconUrl?: string = 'https://www.accuweather.com/images/weathericons/';
    degreeUnits?: DegUnit = 'celsius';
    chosenLocation?: LocationItem = {
        key: '215854',
        name: 'Tel Aviv'
    };
    currentWeather?: CurrentWeather;
    foreCast?: ForeCast;
    favoriteAdded?: CurrentWeather[];
    favoriteList?: CurrentWeather[];
}

export const initAppState = Object.freeze( new AppState() );

export const rootReducer = ( state: AppState, action: ActionMethod ) => {

    let update: AppState;

    switch( action.type ){
        case actionList.GET_REQUEST_STATUS :
            update = {
                serverRequest: action.data,
            };
        return updateState( state, action, update );
        case actionList.SET_DEGREE_UNIT :
            update = {
                degreeUnits: action.data,
            };
        return updateState( state, action, update );
        case actionList.SEARCH_LOCATION :
            update = {
                locationSearch: action.data,
            };
        return updateState( state, action, update );
        case actionList.GET_SEARCH_QUERY :
            update = {
                chosenLocation: action.data,
            };
        return updateState( state, action, update );
        case actionList.GET_CURRENT_WEATHER :
            update = {
                currentWeather: action.data,
            };
        return updateState( state, action, update );
        case actionList.GET_FORECAST :
            update = {
                foreCast: action.data,
            };
        return updateState( state, action, update );
        case actionList.ADD_TO_FAVORITES :
            update = {
                favoriteAdded: action.data,
            };
        return updateState( state, action, update );
        case actionList.GET_FAVORITES :
            update = {
                favoriteList: action.data,
            };
        return updateState( state, action, update );


    }
    return state;
}
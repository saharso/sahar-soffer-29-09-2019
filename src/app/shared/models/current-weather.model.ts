import { ForeCast } from './forecast.model';
import { LocationItem } from './location.model';

class Temperature {
    Value: number;
    Unit: 'F' | 'C';
    UnitType: number;
}
class TempType {
    Imperial: Temperature;
    Metric: Temperature;
}
export class CurrentWeather extends LocationItem {
    EpochTime: number;
    HasPrecipitation: boolean;
    IsDayTime: boolean;
    Link: string;
    LocalObservationDateTime: string;
    MobileLink:string;
    PrecipitationType: string;
    Temperature: TempType;
    WeatherIcon: number;
    WeatherText: string;
    isFavorite?: boolean;
}
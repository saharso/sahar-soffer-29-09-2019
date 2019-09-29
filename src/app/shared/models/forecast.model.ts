export class Headline {
    EffectiveDate: Date;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate?: any;
    EndEpochDate?: any;
    MobileLink: string;
    Link: string;
}

export class Minimum {
    Value: number;
    Unit: string;
    UnitType: number;
}

export class Maximum {
    Value: number;
    Unit: string;
    UnitType: number;
}

export class Temperature {
    Minimum: Minimum;
    Maximum: Maximum;
}

export class Day {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
}

export class Night {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
}

export class DailyForecast {
    Date: Date;
    EpochDate: number;
    Temperature: Temperature;
    Day: Day;
    Night: Night;
    Sources: string[];
    MobileLink: string;
    Link: string;
}

export class ForeCast {
    Headline: Headline;
    DailyForecasts: DailyForecast[];
}




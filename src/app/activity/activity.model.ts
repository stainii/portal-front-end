import Location from "@app/activity/location.model";
import {DateInterval} from "@app/activity/date-interval.model";
import {Weather} from "@app/activity/weather.model";

export interface Activity {
    id: string;
    name: string;
    photo: string;
    newPhotoContent: string | ArrayBuffer;
    description: string;
    source: string;
    location: Location;
    weather: Weather;
    minNumberOfParticipants: number;
    maxNumberOfParticipants: number;
    dateIntervals: DateInterval[];
    timeIntervals: any[];
    labels: string[];
}

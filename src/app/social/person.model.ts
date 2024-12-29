import {Moment} from "moment";

export interface Person {

    id: number;
    name: string;
    colorThumbnail: string;
    sepiaThumbnail: string;
    newImageContent: string | ArrayBuffer;
    minNumberOfDaysBetweenContacts: number;
    maxNumberOfDaysBetweenContacts: number;
    lastContact: Moment;
    latestUpdates: string;

    shouldContact: boolean;
}

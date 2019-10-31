import { Athlete } from './athlete';


export class Classification {
    id: number;
    eventCode: string;
    startDate: Date;
    totalPoints: number;
    athlete: Athlete;
    category: string;

    constructor(eventCode: string, startDate: Date, totalPoints: number, athlete: Athlete, category: string) {
        this.eventCode = eventCode;
        this.startDate = startDate;
        this.totalPoints = totalPoints;
        this.athlete = athlete;
    }
}

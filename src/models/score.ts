import { Judge } from './judge';
import { Athlete } from './athlete';


export class Score {
    id: number;
    eventId: string;
    athlete: Athlete;
    judge: Judge;
    date: string;
    imgUrl: string;
    scaled: boolean;
    location: string;
    timeScored: string;
    score: number;
    position: number;
    category: string;

    constructor(
        eventId: string, athlete: Athlete, judge: Judge, category: string,
        date: string, imgUrl: string, scaled: boolean, location: string,
        timeScored: string, score: number) {
        this.id = null;
        this.eventId = eventId;
        this.athlete = athlete;
        this.judge = judge;
        this.category = category;
        this.date = date;
        this.imgUrl = imgUrl;
        this.scaled = scaled;
        this.location = location;
        this.timeScored = timeScored;
        this.score = score;
        this.position = 1;
    }
}

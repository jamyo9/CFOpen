import { Athlete } from "./athlete";
import { Judge } from "./judge";

export class Score {
    id: number;
    eventId: number;
    athlete: Athlete;
    judge: Judge;
    judgeCertified: boolean;
    date: Date;
    imgUrl:string;
    scaled: boolean;
    location: string;
    timeScored: string;
    score: number;
    position: number;

    constructor(eventId: number) {
        this.id = null;
        this.eventId = eventId;
        this.athlete = null;
        this.judge = null;
        this.date = null;
        this.imgUrl = "";
        this.scaled = false;
        this.location = "";
        this.timeScored = "";
        this.score = 0;
        this.position = 1;
    }
}
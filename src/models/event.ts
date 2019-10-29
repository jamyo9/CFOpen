import { Score } from './score';

export class Event {
    id: string;
    idTournament: string;
    code: string;
    name: string;
    startDate: Date;
    menRxClassification: Score[];

    constructor(idTournament: string, code: string, name: string, startDate: Date, menRxClassification: Score[]) {
        this.idTournament = idTournament;
        this.code = code;
        this.name = name;
        this.startDate = startDate;
        this.menRxClassification = menRxClassification;
    }
}

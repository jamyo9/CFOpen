import { Score } from './score';

export class Event {
    id: string;
    idTournament: string;
    code: string;
    name: string;
    startDate: Date;
    description: string;

    constructor(idTournament: string, code: string, name: string, startDate: Date, description: string) {
        this.idTournament = idTournament;
        this.code = code;
        this.name = name;
        this.startDate = startDate;
        this.description = description;
    }
}

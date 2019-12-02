import { Score } from './score';

export class Event {
    id: string;
    idTournament: string;
    code: string;
    name: string;
    startDate: string;
    endDate: string;
    description: string;

    constructor(idTournament: string, code: string, name: string, startDate: string, endDate: string, description: string) {
        this.idTournament = idTournament;
        this.code = code;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}

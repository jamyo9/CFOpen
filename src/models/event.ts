import { Score } from './score';

export class Event {
    id: string;
    tournamentId: string;
    code: string;
    name: string;
    startDate: string;
    endDate: string;
    description: string;

    constructor(tournamentId: string, code: string, name: string, startDate: string, endDate: string, description: string) {
        this.tournamentId = tournamentId;
        this.code = code;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
    }
}

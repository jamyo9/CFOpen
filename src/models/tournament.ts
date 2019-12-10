
export class Tournament {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    description: string;
    boxId: string

    constructor(name: string, startDate: string, endDate: string, description: string, boxId: string) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.boxId = boxId;
    }
}

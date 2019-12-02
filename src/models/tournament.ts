
export class Tournament {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    page: string;

    constructor(name: string, startDate: string, endDate: string, page: string) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.page = page;
    }
}

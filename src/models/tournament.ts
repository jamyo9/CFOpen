
export class Tournament {
    id: number;
    name: string;
    startDate: Date;
    page: string;

    constructor(name: string, startDate: Date, page: string) {
        this.name = name;
        this.startDate = startDate;
        this.page = page;
    }
}

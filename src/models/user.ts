export class User {
    id: number;
    name: string;
    lastName: string;
    category: string;
    group: string;
    company: string;
    dni: string;
    address: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }
}
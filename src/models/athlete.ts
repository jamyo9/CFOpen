export class Athlete {
    id: string;
    name: string;
    lastName: string;
    dni: string;
    address: string;
    email: string;
    category: string;

    constructor(name: string, lastName: string, dni: string, address: string, email: string, category: string) {
        this.name = name;
        this.lastName = lastName;
        this.dni = dni;
        this.address = address;
        this.email = email;
        this.category = category;
    }
}

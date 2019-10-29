export class Judge {
    id: number;
    name: string;
    lastName: string;
    dni: string;
    address: string;
    email: string;

    constructor(name: string, lastName: string, dni: string, address: string, email: string) {
        this.name = name;
        this.lastName = lastName;
        this.dni = dni;
        this.address = address;
        this.email = email;
    }
}
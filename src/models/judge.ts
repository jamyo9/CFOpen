export class Judge {
    id: number;
    name: string;
    lastName: string;
    dni: string;
    address: string;
    email: string;
    certified: boolean;

    constructor(name: string, lastName: string, dni: string, address: string, email: string, certified: boolean) {
        this.name = name;
        this.lastName = lastName;
        this.dni = dni;
        this.address = address;
        this.email = email;
        this.certified = certified;
    }
}

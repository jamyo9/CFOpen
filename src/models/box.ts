export class Box {
    id: string;
    name: string;
    email: string;
    registerCode: string;

    constructor(name: string, email: string, registerCode: string) {
        this.name = name;
        this.email = email;
        this.registerCode = registerCode;
    }
}

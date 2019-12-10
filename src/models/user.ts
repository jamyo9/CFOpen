export interface UserRoles {
    user: boolean;
    judge?: boolean;
    admin?:  boolean;
}

export class User {
    id: string;
    name: string;
    lastName: string;
    category: string;
    // group: string;
    // company: string;
    dni: string;
    address: string;
    email: string;
    userRoles: UserRoles;
    boxId: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
        this.userRoles    = { user: true }
    }
}

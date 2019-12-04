export interface UserRoles {
    user: boolean;
    judge?: boolean;
    admin?:  boolean;
  }
export class User {
    name: string;
    lastName: string;
    category: string;
    group: string;
    company: string;
    dni: string;
    address: string;
    email: string;
    userRoles: UserRoles;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
        this.userRoles    = { user: true }
    }
}
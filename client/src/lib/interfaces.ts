export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    READ_ONLY = "READ_ONLY"
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    isBlocked: boolean;
    updateAt?: Date;
    createdAt: Date;
}
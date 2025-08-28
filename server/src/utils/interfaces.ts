
export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    READ_ONLY = "READ_ONLY"
}

export enum TransactionType {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE"
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

export interface ITransaction {
    id: string;
    type: TransactionType;
    amount: Number;
    category: string;
    description?: string;
    date: string;
    userId: string;
    user: IUser;
    createdAt: string
}
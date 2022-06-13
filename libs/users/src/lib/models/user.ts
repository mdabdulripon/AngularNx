export interface IUser {
    id?: string;
    name?: string;
    password?: string;
    email: string;
    phone?: string;
    token?: string;
    isAdmin?: true;
    street?: string;
    apartment?: string;
    zip?: string;
    city?: string;
    state?: string;
    country?: string;
}

export interface IUser {
    id?: string;
    name?: string;
    password?: string;
    email: string;
    phone?: string;
    token?: string | null | undefined;
    isAdmin?: boolean;
    street?: string;
    apartment?: string;
    zip?: string;
    city?: string;
    state?: string;
    country?: string;
    // TODO Removes everything and have a ways to store address. 
}

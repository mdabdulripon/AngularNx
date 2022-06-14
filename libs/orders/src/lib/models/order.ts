import { IUser } from "@alligatorspace/users";
import { IOrderItem } from "./orderItem";

export interface IOrder {
    id?: string;
    orderItem?: IOrderItem;
    shippingAddress1?: string; // TODO changes the properties 
    shippingAddress2?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    status?: string;
    totalPrice?: string;
    user?: IUser;
    dateOrder?: string;         // TODO changes this property to orderDate
}

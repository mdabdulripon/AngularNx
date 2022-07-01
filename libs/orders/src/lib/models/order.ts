import { IUser } from "@alligatorspace/users";
import { IOrderItem } from "./orderItem";

export interface IOrder {
    id?: string;
    orderItems?: IOrderItem[];
    shippingAddress1?: string;
    shippingAddress2?: string;
    city?: string;
    zip?: string;
    country?: string;
    phone?: string;
    status?: number;
    totalPrice?: string;
    user?: any;
    dateOrdered?: string;
}

export interface ICart {
    items: ICartItem[];
}

export interface ICartItem {
    productId?: string;
    quantity?: number;
}

export interface ICartItemDetails {
    product?: any;
    quantity?: number;
}

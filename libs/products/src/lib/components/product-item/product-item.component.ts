import { CartService, ICartItem } from '@alligatorspace/orders';
import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/product';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html'
})
export class ProductItemComponent {
    @Input() product!: IProduct;

    constructor(private cartService: CartService) { }

    addProductToCart() {
        const cartItem: ICartItem = {
            productId: this.product.id,
            quantity: 1
        }
        this.cartService.setCartItem(cartItem)
    }
}

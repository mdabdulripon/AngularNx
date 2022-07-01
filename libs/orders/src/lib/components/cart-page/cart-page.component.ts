import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ICartItemDetails } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {
    cartItemDetails: ICartItemDetails[] = [];
    cartCount = 0;
    endSubs$: Subject<any> = new Subject();

    constructor(
        private router: Router,
        private cartService: CartService,
        private ordersService: OrdersService) {}

    ngOnInit(): void {
        this._getCartDetails();
        console.log(this.cartItemDetails);
    }

    ngOnDestroy() {
        this.endSubs$.complete();
        this.endSubs$.unsubscribe();
    }

    private _getCartDetails() {
        this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(res => {
            this.cartItemDetails = [];
            this.cartCount = res?.items.length ?? 0;
            res.items.forEach(cartItem => {
                this.ordersService.getProduct(cartItem.productId!).subscribe( product => {
                    this.cartItemDetails.push({
                        product: product,
                        quantity: cartItem.quantity
                    });
                });
            });
        });
    }

    goBackToProducts() {
        this.router.navigate(['/products'])
    }

    deleteCartItem(cartItem: ICartItemDetails) {
        this.cartService.deleteCartItem(cartItem.product.id);
    }
    
   
}

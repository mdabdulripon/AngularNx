import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil, take } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
    selector: 'orders-order-summary',
    templateUrl: './order-summary.component.html',
    styles: []
})
export class OrderSummaryComponent implements OnInit {
    endSubs$: Subject<any> = new Subject();
    totalPrice = 0;
    isCheckout = false;
    
    constructor(
        private router: Router,
        private cartService: CartService,
        private ordersService: OrdersService,
    ) {
        this.router.url.includes('checkout') ? 
            (this.isCheckout = true) : (this.isCheckout = false);
    }

    ngOnInit(): void {
        this._getOrderSummary();
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
        this.endSubs$.unsubscribe();
    }

    private _getOrderSummary() {
        this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
            this.totalPrice = 0;
            if (cart) {
                cart.items.map((item: any) => {
                    this.ordersService
                        .getProduct(item.productId!)
                        .pipe(take(1))
                        .subscribe((product: any) => {
                            this.totalPrice += product.price * item.quantity;
                        });
                });
            }
        });
    }

    navigateToCheckout() {
        this.router.navigate(['/checkout']);
    }
}

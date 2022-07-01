import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
    selector: 'orders-cart-badge',
    templateUrl: './cart-badge.component.html'
})
export class CartBadgeComponent implements OnInit {
    cartItemCount = 0;
    endSub$: Subject<any> = new Subject();

    constructor(private cartService: CartService) {}
    
    ngOnInit(): void {
        this.getCartCount();
    }

    // ngOnDestroy(): void {
    //     this.endSub$.complete();
    //     this.endSub$.unsubscribe();
    // }

    getCartCount() {
        this.cartService.cart$
            // .pipe(takeUntil(this.endSub$))
            .subscribe(res => {
                if (res) {
                    this.cartItemCount = 0;
                    res.items.map(x => {
                        this.cartItemCount += x.quantity!;
                    });
                }
            });
    }
}

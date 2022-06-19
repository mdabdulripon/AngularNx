import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IProduct } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-products-details',
    templateUrl: './products-details.component.html'
})
export class ProductsDetailsComponent implements OnInit, OnDestroy {
    product!: IProduct;
    quantity = 0;
    endSubs$: Subject<any> = new Subject();

    constructor(private productsService: ProductsService, private route: ActivatedRoute) {}
   
    ngOnInit(): void {
        this.route.params.subscribe(res => {
            if (res['productId']) {
                this.getProduct(res['productId'])
            }
        })
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
        this.endSubs$.unsubscribe();
    }

    getProduct(productId: any) {
        this.productsService.getProduct(productId)
            .pipe(takeUntil(this.endSubs$))
            .subscribe(res => {
                this.product = res;
            });
    }
}

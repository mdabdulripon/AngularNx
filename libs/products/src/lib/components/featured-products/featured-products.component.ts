import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { pipe, Subject, takeUntil } from 'rxjs';
import { IProduct } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html'
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

    featuredProducts: any[]= []; 
    endSubs$: Subject<any> = new Subject();

    constructor(private productsService: ProductsService) {}
   

    ngOnInit(): void {
        this.getFeaturedProducts();
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
        this.endSubs$.unsubscribe();
    }

    getFeaturedProducts() {
        this.productsService.getFeaturedProducts(4)
        .pipe(takeUntil(this.endSubs$))
        .subscribe(res => {
            this.featuredProducts = res;
            console.log("🚀", this.featuredProducts)
        });
    }
}

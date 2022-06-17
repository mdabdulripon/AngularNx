import { IProduct, ProductsService } from '@alligatorspace/products';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pipe, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['name', 'brand', 'price', 'action'];
    dataSource: IProduct[] = [];
    endSubs$: Subject<any> = new Subject();

    constructor(
        private productsService: ProductsService,
        private router: Router) {}
   
    ngOnInit(): void {
        this.getProducts();
    }

    ngOnDestroy(): void {
		this.endSubs$.complete();
		this.endSubs$.unsubscribe();
    }

    getProducts() {
        this.productsService.getProducts()
            .pipe(takeUntil(this.endSubs$))
            .subscribe(res => {
                if (res) {
                    this.dataSource = res;
                }
            });
    }

    // TODO: Add confirmation message in the future
    deleteProduct(productId: string) {
        this.productsService.deleteProduct(productId)
            .pipe(takeUntil(this.endSubs$))
            .subscribe(res => {
                if(res) {
                    this.getProducts();
                    console.log(`successfully deleted`);
                }
            })
    }

    editProduct(productId: string) {
        this.router.navigateByUrl(`products/form/${productId}`);
    }

}

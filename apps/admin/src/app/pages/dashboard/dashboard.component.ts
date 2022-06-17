import { OrdersService } from '@alligatorspace/orders';
import { ProductsService } from '@alligatorspace/products';
import { UsersService } from '@alligatorspace/users';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
    endSubs$: Subject<any> = new Subject();
    pageTitle = 'Dashboard';
    subPageTitle = 'items'
    statistics = [];
    
    constructor(
        private ordersService: OrdersService,
        private userService: UsersService,
        private productService: ProductsService) {}

    ngOnInit(): void {
        this.getCounts();
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
        this.endSubs$.unsubscribe();
    }

    getCounts() {
        // combineLatest([
        //     this.ordersService.getOrdersCount(),
        //     this.productService.getProductsCount(),
        //     this.userService.getUsersCount(),
        //     this.ordersService.getTotalSales()
        // ]).pipe(takeUntil(this.endSubs$)).subscribe((values) => {
        //     this.statistics = values;
        //     console.log("statistics", this.statistics);
        // });
    }
}

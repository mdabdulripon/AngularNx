import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder, OrdersService } from '@alligatorspace/orders';
import { Subject, takeUntil } from 'rxjs';

const ORDER_STATUS = {
	0: {
		label: 'Pending',
		color: 'primary',
	},
	1: {
		label: 'Process',
		color: 'accent',
	},
	2: {
		label: 'Shipped',
		color: 'warn',
	},
	3: {
		label: 'Delivered',
		color: 'primary',
	},
	4: {
		label: 'Failed',
		color: 'warn',
	}
}

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit, OnDestroy {
	orderStatus = ORDER_STATUS;
	displayedColumns: string[] = ['user', 'totalPrice', 'dateOrder', 'status', 'action'];
	dataSource: IOrder[] = [];
	endSubs$: Subject<any> = new Subject();

	constructor(
		private ordersService: OrdersService,
		private router: Router) {}
	
	ngOnInit(): void {
		this.getOrders();
	}

	ngOnDestroy(): void {
		this.endSubs$.complete();
		this.endSubs$.unsubscribe();
	}

	getOrders() {
		this.ordersService.getOrders()
			.pipe(takeUntil(this.endSubs$))
			.subscribe(res => {
				if (res) {
					this.dataSource = res;
				}
			});
	}

	// TODO: Add confirmation message in the future
	deleteOrder(orderId: string) {
		this.ordersService.deleteOrder(orderId)
			.pipe(takeUntil(this.endSubs$))
			.subscribe(res => {
				if(res) {
					this.getOrders();
					console.log(`successfully deleted`);
				}
			})
	}

	editOrder(orderId: string) {
		this.router.navigateByUrl(`categories/form/${orderId}`);
	}

}

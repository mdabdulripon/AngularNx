import { UsersService } from '@alligatorspace/users';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICart } from '../../models/cart';
import { IOrder } from '../../models/order';
import { IOrderItem } from '../../models/orderItem';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import * as countriesLib from 'i18n-iso-countries';
import { Subject, takeUntil } from 'rxjs';

declare const require;

@Component({
    selector: 'checkout-page',
    templateUrl: './checkout-page.component.html',
    styles: []
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
    form: FormGroup;
    isSubmitted = false;
    orderItems: IOrderItem[] = [];
    userId?: string;
    countries: { id: string; name: string; }[];
    unsubscribe$: Subject<any> = new Subject();
    
    get checkoutForm() {
        return this.form.controls;
    }
    
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private cartService: CartService,
        private ordersService: OrdersService,
        private usersService: UsersService
    ) {}
   
    ngOnInit(): void {
        this._initCheckoutForm();
        this.autoFillUserData();
        this._getCartItems();
        this._getCountries();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.complete();
        this.unsubscribe$.unsubscribe();
    }
    
    private _initCheckoutForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            phone: [''],
            city: ['', Validators.required],
            country: ['', Validators.required],
            zip: ['', Validators.required],
            apartment: [''],
            street: ['', Validators.required]
        });
    }

    private autoFillUserData() {
        this.usersService.observeCurrentUser()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((user) => {
                if (user) {
                    this.userId = user.id;
                    this.checkoutForm['name'].setValue(user.name);
                    this.checkoutForm['email'].setValue(user.email);
                    this.checkoutForm['phone'].setValue(user.phone);
                    this.checkoutForm['city'].setValue(user.city);
                    this.checkoutForm['street'].setValue(user.street);
                    this.checkoutForm['country'].setValue(user.country);
                    this.checkoutForm['zip'].setValue(user.zip);
                    this.checkoutForm['apartment'].setValue(user.apartment);
                }
        });
    }

    private _getCartItems() {
        const cart: ICart = this.cartService.getCart();
        this.orderItems = cart.items.map((item) => {
            return {
                product: item.productId,
                quantity: item.quantity
            };
        });
    }
    
      private _getCountries() {
        countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
		this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry => {
			return {
				id: entry[0],
				name: entry[1]
			}
		});
		console.log("countries ", this.countries);
      }
    
      backToCart() {
        this.router.navigate(['/cart']);
      }
    
    placeOrder() {
        this.isSubmitted = true;
        if (this.form.invalid) {
          return;
        }
        const order: IOrder = {
            orderItems: this.orderItems,
            shippingAddress1: this.checkoutForm['street'].value,
            shippingAddress2: this.checkoutForm['apartment'].value,
            city: this.checkoutForm['city'].value,
            zip: this.checkoutForm['zip'].value,
            country: this.checkoutForm['country'].value,
            phone: this.checkoutForm['phone'].value,
            status: 0,
            user: this.userId,
            dateOrdered: `${Date.now()}`
        };
    
        this.ordersService.createOrders(order).subscribe(() => {
            this.cartService.emptyCart();
            this.router.navigate(['/confirm']);
        });
    }
     
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from './services/cart.service';
import { CartBadgeComponent } from './components/cart-badge/cart-badge.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { ReactiveFormsModule } from '@angular/forms';

// TODO: Move this to a separate module
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { AuthGuard, UsersModule } from '@alligatorspace/users';

const MatModules = [
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatDatepickerModule,
    MatChipsModule,
    MatAutocompleteModule
];

const routes: Routes = [
    { 
        path: 'cart', 
        component: CartPageComponent 
    },
    { 
        path: 'checkout',
        canActivate: [AuthGuard],
        component: CheckoutPageComponent
    },
    { 
        path: 'confirm', 
        component: ConfirmationComponent 
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        UsersModule,
        ...MatModules
    ],
    declarations: [
        CartBadgeComponent,
        CartPageComponent,
        OrderSummaryComponent,
        CheckoutPageComponent,
        ConfirmationComponent
    ],
    exports: [
        CartBadgeComponent,
        CartPageComponent,
        OrderSummaryComponent,
        CheckoutPageComponent,
        ConfirmationComponent
    ]
})
export class OrdersModule {
    constructor(private cartService: CartService) {
        cartService.initialCartInLocalStorage();
    }
}

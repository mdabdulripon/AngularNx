import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@alligatorspace/ui';
import { ProductsModule } from '@alligatorspace/products';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrdersModule } from '@alligatorspace/orders';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JwtInterceptor } from '@alligatorspace/users';


const routes: Routes = [
    { path: '', component: HomePageComponent },
];

@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent],
    imports: [
        BrowserModule, 
        RouterModule.forRoot(routes),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientModule,
        UiModule,
        ProductsModule,
        OrdersModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

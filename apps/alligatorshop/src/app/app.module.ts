import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@alligatorspace/ui';
import { ProductsModule } from '@alligatorspace/products';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
    { path: '', component: HomePageComponent },
];

@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent],
    imports: [
        BrowserModule, 
        RouterModule.forRoot(routes),
        HttpClientModule,
        UiModule,
        ProductsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

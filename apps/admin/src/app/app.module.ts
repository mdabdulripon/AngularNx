import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';


import { MatSliderModule } from '@angular/material/slider';

const routes: Routes = [
    { 
        path: '',
        component: ShellComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent }
        ]
    }
];

@NgModule({
    declarations: [AppComponent, ShellComponent, SidebarComponent, DashboardComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
        StoreModule.forRoot({}, {}),
        MatSliderModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

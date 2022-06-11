import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';

import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from '@alligatorspace/products';


const MatModules = [
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule
]

const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'categories', component: CategoriesListComponent }
        ]
    }
];

@NgModule({
    declarations: [AppComponent, ShellComponent, SidebarComponent, DashboardComponent, CategoriesListComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
        StoreModule.forRoot({}, {}),
        MatModules
    ],
    providers: [CategoriesService],
    bootstrap: [AppComponent]
})
export class AppModule {}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    pageTitle = 'Dashboard';
    subPageTitle = 'items'
    constructor() {}

    ngOnInit(): void {
        console.log(this.pageTitle);
    }
}

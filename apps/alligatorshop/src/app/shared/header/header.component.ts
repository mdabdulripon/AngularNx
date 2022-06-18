import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'alligatorshop-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
    // constructor() {}

    ngOnInit(): void {
        console.log(`header`);
    }
}

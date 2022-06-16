import { AuthService } from '@alligatorspace/users';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-sidebar',
    templateUrl: './sidebar.component.html'
})
export class SidebarComponent  {
    constructor(private authService: AuthService, private router: Router) {}

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}

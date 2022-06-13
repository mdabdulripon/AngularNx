import { IUser, UsersService } from '@alligatorspace/users';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit {

	displayedColumns: string[] = ['name', 'email', 'isAdmin', 'country', 'action'];
	dataSource: IUser[] = [];

	constructor(
		private usersService: UsersService,
		private router: Router) {}

	ngOnInit(): void {
		this.getUsers();
	}

	getUsers() {
		this.usersService.getUsers().subscribe(res => {
			if (res) {
				this.dataSource = res;
			}
		});
	}

	// TODO: Add confirmation message in the future
	deleteCategory(categoryId: string) {
		this.usersService.deleteUser(categoryId).subscribe(res => {
			if(res) {
				this.getUsers();
				console.log(`successfully deleted`);
			}
		})
	}

	editCategory(categoryId: string) {
		this.router.navigateByUrl(`users/form/${categoryId}`);
	}

}

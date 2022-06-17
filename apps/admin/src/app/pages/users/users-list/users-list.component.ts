import { IUser, UsersService } from '@alligatorspace/users';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html'
})
export class UsersListComponent implements OnInit, OnDestroy {

	displayedColumns: string[] = ['name', 'email', 'isAdmin', 'country', 'action'];
	dataSource: IUser[] = [];
	endSubs$: Subject<any> = new Subject();

	constructor(
		private usersService: UsersService,
		private router: Router) {}
	
	ngOnInit(): void {
		this.getUsers();
	}

	ngOnDestroy(): void {
		this.endSubs$.complete();
		this.endSubs$.unsubscribe();
	}

	getUsers() {
		this.usersService.getUsers()
			.pipe(takeUntil(this.endSubs$))
			.subscribe(res => {
				if (res) {
					this.dataSource = res;
				}
			});
	}

	// TODO: Add confirmation message in the future
	deleteCategory(categoryId: string) {
		this.usersService.deleteUser(categoryId)
			.pipe(takeUntil(this.endSubs$))
			.subscribe(res => {
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

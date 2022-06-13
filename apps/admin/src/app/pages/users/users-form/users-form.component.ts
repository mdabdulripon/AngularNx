import { IUser, UsersService } from '@alligatorspace/users';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as countriesLib from 'i18n-iso-countries';

declare const require;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html'
})
export class UsersFormComponent implements OnInit {
	form: FormGroup;
	isSubmitted = false;
	editMode = false; 
	userId: string;
	hidePassword: boolean;
	countries: { id: string; name: string; }[];

	get usersForm() {
		return this.form.controls;
	}

	constructor(
		private formBuilder: FormBuilder, 
		private usersService: UsersService,
		private router: Router,
		private route: ActivatedRoute ) {}

	ngOnInit(): void {
		this.getCountries();
		this.initializeForm();
		this.checkEditMode();
	}

	getCountries() {
		countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
		this.countries = Object.entries(countriesLib.getNames("en", {select: "official"})).map(entry => {
			return {
				id: entry[0],
				name: entry[1]
			}
		})
		console.log("countries ", this.countries);
	}

	initializeForm() {
		this.form = this.formBuilder.group({
			name: ['', Validators.required],
			password: ['', Validators.required],
			email: ['', Validators.required],
			phone: ['', Validators.required],
			isAdmin: [false],
			street: [''],
			apartment: [''],
			zip: [''],
			city: [''],
			state: [''],
			country: [''],
		});
	}

	checkEditMode() {
		this.route.params.subscribe( params => {
			if (params['id']) {
				this.editMode = true;
				this.userId = params['id'];
				this.usersService.getUser(params['id']).subscribe( res => {
					this.usersForm['name'].setValue(res.name);
					this.usersForm['email'].setValue(res.email);
					this.usersForm['phone'].setValue(res.phone);
					this.usersForm['isAdmin'].setValue(res.isAdmin);
					this.usersForm['street'].setValue(res.street);
					this.usersForm['apartment'].setValue(res.apartment);
					this.usersForm['city'].setValue(res.city);
					this.usersForm['state'].setValue(res.state);
					this.usersForm['zip'].setValue(res.zip);
					this.usersForm['country'].setValue(res.country);

					this.usersForm['password'].setValidators([]);
					this.usersForm['password'].updateValueAndValidity();
				})
			}
		})
	}

	onSubmit(): void {
		if (this.form.invalid) {
			return;
		}
		const user: IUser = {
			id: this.userId,
			name: this.usersForm['name'].value,
			email: this.usersForm['email'].value,
			password: this.usersForm['password'].value,
			phone: this.usersForm['phone'].value,
			isAdmin: this.usersForm['isAdmin'].value,
			street: this.usersForm['street'].value,
			apartment: this.usersForm['apartment'].value,
			city: this.usersForm['city'].value,
			state: this.usersForm['state'].value,
			zip: this.usersForm['zip'].value,
			country: this.usersForm['country'].value,
		}

		if (this.editMode) {
			this.updateCategory(user); 
		} else {
			this.createCategory(user); 
		}        
	}

	createCategory(user: IUser ) {
		this.usersService.createUser(user).subscribe((res) => {
			if(res) {
				// this.form.reset();
				console.log(`success`);
			}
		}, (err) => {
			console.log(`err`, err);
		});
	}

	updateCategory(user: IUser) {
		this.usersService.updateUser(user).subscribe((res) => {
			if(res) {
				console.log(`success`);
			}
		}, (err) => {
			console.log(`err`, err);
		});
	}

	onCancel(): void {
		this.router.navigateByUrl('users');
	}

	togglePassword() {
		this.hidePassword = !this.hidePassword;
	}
}

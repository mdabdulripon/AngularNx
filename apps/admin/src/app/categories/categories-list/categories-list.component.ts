import { Component, OnInit } from '@angular/core';
import { CategoriesService, ICategory } from '@alligatorspace/products';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'name', 'icon', 'action'];
    dataSource: ICategory[] = [];

    constructor(
        private categoriesService: CategoriesService,
        private router: Router) {}

    ngOnInit(): void {
        this.getCategories();
    }

    getCategories() {
        this.categoriesService.getCategories().subscribe(res => {
            if (res) {
                this.dataSource = res;
            }
        });
    }

    // TODO: Add confirmation message in the future
    deleteCategory(categoryId: string) {
        this.categoriesService.deleteCategory(categoryId).subscribe(res => {
            if(res) {
                this.getCategories();
                console.log(`successfully deleted`);
            }
        })
    }

    editCategory(categoryId: string) {
        this.router.navigateByUrl(`categories/form/${categoryId}`);
    }
}

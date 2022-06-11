import { Component, OnInit } from '@angular/core';
import { CategoriesService, ICategory } from '@alligatorspace/products';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit {
    categories = [
        { id: '1', name: 'category-1', icon: 'icon-1' },
        { id: '2', name: 'category-2', icon: 'icon-2' },
        { id: '3', name: 'category-3', icon: 'icon-3' }
    ];
    displayedColumns: string[] = ['id', 'name', 'icon'];
    dataSource: ICategory[] = [];

    constructor(private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this.categoriesService.getCategories().subscribe(res => {
            if (res) {
                console.log("Categories response", res);
                this.dataSource = res;
            }
        });
        this.dataSource = this.categories;
    }
}

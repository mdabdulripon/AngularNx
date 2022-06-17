import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, ICategory } from '@alligatorspace/products';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html'
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['name', 'icon', 'color', 'action'];
    dataSource: ICategory[] = [];
    endSubs$: Subject<any> = new Subject();

    constructor(
        private categoriesService: CategoriesService,
        private router: Router) {}
    
    ngOnInit(): void {
        this.getCategories();
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
        this.endSubs$.unsubscribe();
    }

    getCategories() {
        this.categoriesService.getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe(res => {
                if (res) {
                    this.dataSource = res;
                }
            });
    }

    // TODO: Add confirmation message in the future
    deleteCategory(categoryId: string) {
        this.categoriesService.deleteCategory(categoryId)
            .pipe(takeUntil(this.endSubs$))
            .subscribe(res => {
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

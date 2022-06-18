import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ICategory } from '../../models/category';
import { IProduct } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'products-products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit, OnDestroy {

    products: IProduct[] = [];
    categories: ICategory[] = [];
    endSubs$: Subject<any> = new Subject();

    constructor(private productService: ProductsService, private categoriesService: CategoriesService) {}
    
    ngOnInit(): void {
        this.getProducts();
        this.getCategories();
    }

    ngOnDestroy(): void {
        this.endSubs$.complete();
        this.endSubs$.unsubscribe();
    }

    getProducts(categoryFilters?: string[]) {
        this.productService.getProducts(categoryFilters)
            .pipe(takeUntil(this.endSubs$))
            .subscribe(res => {
                this.products = res;
            });
    }
    
    getCategories() {
        this.categoriesService.getCategories()
            .pipe(takeUntil(this.endSubs$))
            .subscribe(res => {
                this.categories = res;
            });
    }

    applyCategoryFilter() {
        const selectedCategory = this.categories
            .filter(x => x.checked)
            .map(x => x.id) as string[];

        if (selectedCategory && selectedCategory.length > 0) {
            this.getProducts(selectedCategory);
        }
    }
}

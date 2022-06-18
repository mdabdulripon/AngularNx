import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsListComponent } from './components/products-list/products-list.component';

const routes: Routes = [
    { path: 'products', component: ProductsListComponent}
]

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
    declarations: [ProductsSearchComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent],
    exports: [ProductsSearchComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent]
})
export class ProductsModule {}

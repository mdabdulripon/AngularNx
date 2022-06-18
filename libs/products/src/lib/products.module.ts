import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ProductsSearchComponent, ProductItemComponent, FeaturedProductsComponent],
    exports: [ProductsSearchComponent, ProductItemComponent, FeaturedProductsComponent]
})
export class ProductsModule {}

import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html'
})
export class ProductItemComponent {
    @Input() product!: IProduct;
}

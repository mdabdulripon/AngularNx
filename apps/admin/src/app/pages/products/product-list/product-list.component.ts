import { IProduct, ProductsService } from '@alligatorspace/products';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
    displayedColumns: string[] = ['name', 'brand', 'price', 'action'];
    /*['category', 'quantity', 'description', 'shortDescription', 'image', 'isFeatured']**/ 
    dataSource: IProduct[] = [];

    constructor(
        private productsService: ProductsService,
        private router: Router) {}

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.productsService.getProducts().subscribe(res => {
            if (res) {
                this.dataSource = res;
            }
        });
    }

    // TODO: Add confirmation message in the future
    deleteProduct(productId: string) {
        this.productsService.deleteProduct(productId).subscribe(res => {
            if(res) {
                this.getProducts();
                console.log(`successfully deleted`);
            }
        })
    }

    editProduct(productId: string) {
        this.router.navigateByUrl(`products/form/${productId}`);
    }

}

import { CategoriesService, ICategory, ProductsService } from '@alligatorspace/products';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {

  	form: FormGroup;
    isSubmitted = false;
    editMode = false; 
    currentProductId: string;
    categories: ICategory[];
    imageDisplay: string | ArrayBuffer;

    get productForm() {
        return this.form.controls;
    }

    constructor(
        private formBuilder: FormBuilder, 
        private categoriesService: CategoriesService,
        private productService: ProductsService,
        private router: Router,
        private route: ActivatedRoute ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required ],
            brand: ['', Validators.required ],
            price: ['', Validators.required ],
            category: ['', Validators.required ],
            countInStock: ['', Validators.required ],
            description: ['', Validators.required ],
            image: [''],
            isFeatured: [false]
        });
        this.getCategories();
        this.checkEditMode();
    }


    getCategories() {
        this.categoriesService.getCategories().subscribe(res => {
            this.categories = res;
        })
    }

    checkEditMode() {
        this.route.params.subscribe( params => {
            if (params['id']) {
                this.editMode = true;
                this.currentProductId = params['id'];
                this.productService.getProduct(params['id']).subscribe( res => {
                    this.productForm['name'].setValue(res.name);
                    this.productForm['category'].setValue(res.category.id);
                    this.productForm['brand'].setValue(res.brand);
                    this.productForm['price'].setValue(res.price);
                    this.productForm['countInStock'].setValue(res.countInStock);
                    this.productForm['description'].setValue(res.description);
                    this.productForm['isFeatured'].setValue(res.isFeatured);
                    this.imageDisplay = res.image;
                })
            }
        })
    }

    onSubmit(): void {
        if (this.form.invalid) {
            return;
        }
        const productFormData = new FormData();
        Object.keys(this.productForm).map((key)  => {
            productFormData.append(key, this.productForm[key].value);
        });
        
        if (this.editMode) {
            this.updateCategory(productFormData); 
        } else {
            this.createCategory(productFormData); 
        }        
    }

    createCategory(productData: FormData) {
        this.productService.createProduct(productData).subscribe((res) => {
            if(res) {
                // this.form.reset();
                console.log(`success`);
            }
        }, (err) => {
            console.log(`err`, err);
        });
    }

    updateCategory(productData: FormData) {
        this.productService.updateProduct(productData, this.currentProductId).subscribe((res) => {
            if(res) {
                console.log(`success`);
            }
        }, (err) => {
            console.log(`err`, err);
        });
    }

    onCancel(): void {
        this.router.navigateByUrl('products');
    }

    // Image Upload 
    onImageUpload(event) {
        const file = event.target.files[0];
        console.log(event.target.files);

        if (file) {
            this.form.patchValue({image: file});
            this.form.get('image').updateValueAndValidity();
            const fileReader = new FileReader();
            // this must define before the data reading
            fileReader.onload = (() => {
                this.imageDisplay = fileReader.result;
            });
            fileReader.readAsDataURL(file);
        }
    }
}

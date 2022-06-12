import { CategoriesService, ICategory } from '@alligatorspace/products';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html'
})
export class CategoriesFormComponent implements OnInit {

    form: FormGroup;
    isSubmitted = false;
    editMode = false; 
    currentCategoryId: string;

    get categoryForm() {
        return this.form.controls;
    }

    constructor(
        private formBuilder: FormBuilder, 
        private categoriesService: CategoriesService,
        private router: Router,
        private route: ActivatedRoute ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required ],
            icon: ['', Validators.required ],
            color: ['', Validators.required ],
        });
        this.checkEditMode();
    }

    checkEditMode() {
        this.route.params.subscribe( params => {
            if (params['id']) {
                this.editMode = true;
                this.currentCategoryId = params['id'];
                this.categoriesService.getCategory(params['id']).subscribe( res => {
                    this.categoryForm['name'].setValue(res.name);
                    this.categoryForm['icon'].setValue(res.name);
                    this.categoryForm['color'].setValue(res.color);
                })
            }
        })
    }

    onSubmit(): void {
        if (this.form.invalid) {
            return;
        }
        const category: ICategory = {
            id: this.currentCategoryId,
            name: this.categoryForm['name'].value,
            icon: this.categoryForm['icon'].value,
            color: this.categoryForm['color'].value
        }

        if (this.editMode) {
            this.updateCategory(category); 
        } else {
            this.createCategory(category); 
        }        
    }

    createCategory(category: ICategory, ) {
        this.categoriesService.createCategories(category).subscribe((res) => {
            if(res) {
                // this.form.reset();
                console.log(`success`);
            }
        }, (err) => {
            console.log(`err`, err);
        });
    }

    updateCategory(category: ICategory) {
        this.categoriesService.updateCategories(category).subscribe((res) => {
            if(res) {
                console.log(`success`);
            }
        }, (err) => {
            console.log(`err`, err);
        });
    }

    onCancel(): void {
        this.router.navigateByUrl('categories');
    }
}

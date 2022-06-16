import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'

import { LoginComponent } from './pages/login/login.component';

// TODO: Move this to a separate module  
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';

const MatModules = [
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatDatepickerModule,
    MatChipsModule,
    MatAutocompleteModule
];


const routes: Routes = [
    { path: 'login', component: LoginComponent }
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        MatModules,
        ReactiveFormsModule
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class UsersModule {}

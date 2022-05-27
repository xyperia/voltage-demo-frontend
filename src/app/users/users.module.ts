import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent, ListDetailDialog } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { MaterialModule } from 'src/assets/material.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsersRoutingModule,
        MaterialModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        ListDetailDialog,
        AddEditComponent
    ]
})
export class UsersModule { }
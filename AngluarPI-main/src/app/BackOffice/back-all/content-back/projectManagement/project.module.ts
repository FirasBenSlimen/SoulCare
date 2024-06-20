import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjetComponent } from './projetList/projet.component';
import { AddprojetComponent } from './addprojet/addprojet.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { UpdateprojectComponent } from './updateproject/updateproject.component';
import { DeleteprojectComponent } from './deleteproject/deleteproject.component';
import { CommentComponent } from './comment/comment.component';


@NgModule({
  declarations: [
    

  
    DeleteprojectComponent,
               CommentComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatSelectModule,
    FormsModule

  ]
})
export class ProjectModule { }

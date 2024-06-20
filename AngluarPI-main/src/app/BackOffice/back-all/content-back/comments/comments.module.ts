import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddcommentComponent } from './addcomment/addcomment.component';
import { UpdatecommentComponent } from './updatecomment/updatecomment.component';
import { DeletecomponentComponent } from './deletecomponent/deletecomponent.component';
import { DeletecommentComponent } from './deletecomment/deletecomment.component';



@NgModule({
  declarations: [
    AddcommentComponent,
    UpdatecommentComponent,
    DeletecomponentComponent,
    DeletecommentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CommentsModule { }

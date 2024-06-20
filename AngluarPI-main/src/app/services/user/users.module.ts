import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdduserComponent } from '../../BackOffice/back-all/content-back/user/adduser/adduser.component';
import { UpdateuserComponent } from '../../BackOffice/back-all/content-back/user/updateuser/updateuser.component';
import { DeleteuserComponent } from '../../BackOffice/back-all/content-back/user/deleteuser/deleteuser.component';
import { ListuserComponent } from '../../BackOffice/back-all/content-back/user/listuser/listuser.component';
import {NgxPaginationModule} from "ngx-pagination";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    AdduserComponent,
    UpdateuserComponent,
    DeleteuserComponent,
    ListuserComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterLink
  ]
})
export class CommentsModule { }

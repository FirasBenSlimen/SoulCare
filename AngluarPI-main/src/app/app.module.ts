import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './front-office/front-all/login/login.component';
import { RegisterComponent } from './front-office/front-all/register/register.component';
import { AppComponent } from './app.component';
import { FrontAllComponent } from './front-office/front-all/front-all.component';
import { FooterFrontComponent } from './front-office/front-all/footer-front/footer-front.component';
import { ContentFrontComponent } from './front-office/front-all/content-front/content-front.component';
import { HeaderFrontComponent } from './front-office/front-all/header-front/header-front.component';
import { FormsModule } from '@angular/forms';
import { BackAllComponent } from './BackOffice/back-all/back-all.component';
import { NavbarComponent } from './BackOffice/back-all/navbar/navbar.component';
import { SidebarComponent } from './BackOffice/back-all/sidebar/sidebar.component';
import { FooterBackComponent } from './BackOffice/back-all/footer-back/footer-back.component';
import { ContentBackComponent } from './BackOffice/back-all/content-back/content-back.component';
import { HttpClientModule } from '@angular/common/http';

import { CategoryListComponent } from './BackOffice/back-all/content-back/store/category/category-list/category-list.component';
import { AddCategoryComponent } from './BackOffice/back-all/content-back/store/category/add-category/add-category.component';
import { UpdateCategoryComponent } from './BackOffice/back-all/content-back/store/category/update-category/update-category.component';
import { ProjetComponent } from './BackOffice/back-all/content-back/projectManagement/projetList/projet.component';
import { LikeDislikeComponent } from './BackOffice/back-all/content-back/reactions/like-dislike/like-dislike.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListdesreclamationComponent } from './BackOffice/back-all/Reclamation/listdesreclamation/listdesreclamation.component';
import { AjouterreclamationComponent } from './BackOffice/back-all/Reclamation/ajouterreclamation/ajouterreclamation.component';
import { ModifierreclamationComponent } from './BackOffice/back-all/Reclamation/modifierreclamation/modifierreclamation.component';
import { ReponseReclamationComponent } from './BackOffice/back-all/Reclamation/reponse-reclamation/reponse-reclamation.component';
import { ReclamationComponent } from './front-office/front-all/reclamation/reclamation.component';
import { ListReponseComponent } from './BackOffice/back-all/Reclamation/list-reponse/list-reponse.component';
import { ListCategoryComponent } from './BackOffice/back-all/Category/list-category/list-category.component';
import { ListRessouceComponent } from './BackOffice/back-all/Ressource/list-ressouce/list-ressouce.component';
import { AjoutRessouceComponent } from './BackOffice/back-all/Ressource/ajout-ressouce/ajout-ressouce.component';
import { ModifyRessourceComponent } from './BackOffice/back-all/Ressource/modify-ressource/modify-ressource.component';
import { CatgorieFrontComponent } from './front-office/front-all/catgorie-front/catgorie-front.component';
import { RessourcesFrontComponent } from './front-office/front-all/ressources-front/ressources-front.component';
import { HomeComponent } from './front-office/front-all/home/home.component';
import { AdduserComponent } from './BackOffice/back-all/content-back/user/adduser/adduser.component';
import { UpdateuserComponent } from './BackOffice/back-all/content-back/user/updateuser/updateuser.component';
import { DeleteuserComponent } from './BackOffice/back-all/content-back/user/deleteuser/deleteuser.component';
import { ListuserComponent } from './BackOffice/back-all/content-back/user/listuser/listuser.component';
import { EventListComponent } from './BackOffice/back-all/content-back/events/event-list/event-list.component';
import { CreateEventComponent } from './BackOffice/back-all/content-back/events/create-event/create-event.component';
import { UpdateEventComponent } from './BackOffice/back-all/content-back/events/update-event/update-event.component';
import { TicketForEventComponent } from './front-office/front-all/ticket-for-event/ticket-for-event.component';
import { CreateTicketComponent } from './front-office/front-all/create-ticket/create-ticket.component';
import { ProfileComponent } from './front-office/front-all/profile/profile.component';
import { ListePostComponent } from './BackOffice/back-all/Post/list-post/list-post.component';
import { AddPostComponent } from './BackOffice/back-all/Post/add-post/add-post.component';
import { ModifyPostComponent } from './BackOffice/back-all/Post/modify-post/modify-post.component';
import { PostsFrontComponent } from './front-office/front-all/Post/posts-front/posts-front.component';
import { PostsDetailComponent } from './front-office/front-all/Post/posts-detail/posts-detail.component';
import { CategoryComponent } from './BackOffice/back-all/exercise/category/category.component';
import { ExerciseCategoryComponent } from './BackOffice/back-all/exercise/exercise-category/exercise-category.component';
import { ExerciseComponent } from './front-office/front-all/execise-front/exercise/exercise.component';
import { ExercisedetailsComponent } from './front-office/front-all/execise-front/exercisedetails/exercisedetails.component';



@NgModule({
  declarations: [
    AppComponent,
    FrontAllComponent,
    LoginComponent,
    RegisterComponent,
    FooterFrontComponent,
    ContentFrontComponent,
    HeaderFrontComponent,
    BackAllComponent,
    NavbarComponent,
    SidebarComponent,
    FooterBackComponent,
    ContentBackComponent,

    CategoryListComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    ProjetComponent,
    LikeDislikeComponent,

    ListdesreclamationComponent,
    AjouterreclamationComponent,
    ModifierreclamationComponent,
    ReponseReclamationComponent,
    ReclamationComponent,
    ListReponseComponent,
    ListCategoryComponent,

    ListRessouceComponent,
    AjoutRessouceComponent,
    ModifyRessourceComponent,
    CatgorieFrontComponent,
    RessourcesFrontComponent,
    HomeComponent,
    AdduserComponent,
    UpdateuserComponent,
    DeleteuserComponent,
    ListuserComponent,
    EventListComponent,
    CreateEventComponent,
    UpdateEventComponent,
    TicketForEventComponent,
    CreateTicketComponent,
    ProfileComponent,
    ListePostComponent,
    AddPostComponent,
    ModifyPostComponent,
    PostsFrontComponent,
    PostsDetailComponent,
    CategoryComponent,
    ExerciseCategoryComponent,
    ExerciseComponent,
    ExercisedetailsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    DragDropModule,
    NgbPaginationModule,
    NgxPaginationModule

  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReponseReclamation } from 'src/app/model/ReponseReclamation';
import { ReclamationService } from 'src/app/services/reclamation/reclamation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-reponse',
  templateUrl: './list-reponse.component.html',
  styleUrls: ['./list-reponse.component.css']
})
export class ListReponseComponent {
  reponses: ReponseReclamation[]=[];
  searchKeyword: string = '';
  p: number = 1;

  constructor(private service: ReclamationService, private router: Router) { }
  
  ngOnInit() {
   this.getReponse();
  }
 
  getReponse(): void {
    this.service.listreponse().subscribe(
      (data:any) => {
        this.reponses = data;
        console.log('reponses:', data);

      },
      error => {
        console.error('Erreur lors de la récupération des reponses', error);
      }
    );
  }
  
 
  

  searchReclamations(): void {
    if (this.searchKeyword.trim() !== '') {
      this.service.searchReponse(this.searchKeyword).subscribe(
        (data: ReponseReclamation[]) => {
          this.reponses = data;
          console.log('Search results:', data);
        },
        error => {
          console.error('Erreur lors de la recherche des reponses', error);
        }
      );
    } else {
      this.ngOnInit();
    }
  }



}

import { Component } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { Ressource } from 'src/app/model/Ressource';
import { CategoryService } from 'src/app/services/CategoryRessource/category.service';
import { RessourceService } from 'src/app/services/CategoryRessource/ressource.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ressources-front',
  templateUrl: './ressources-front.component.html',
  styleUrls: ['./ressources-front.component.css']
})
export class RessourcesFrontComponent {

  ressources: Ressource[] = [];

  constructor(private ressourceService: RessourceService , private categoryService :CategoryService ,    private route: ActivatedRoute, public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    const storyId = this.route.snapshot.params['id'];
    this.ressourceService.getResourcesByCategoryId(storyId).subscribe((ressources: any) => {
      if (ressources) {
        this.ressources = ressources;
       
      } else {
        console.error('Player data is null');
      }
    });
  
  
  }


  dislikeRessource(idR: number): void {
    this.ressourceService.dislikeRessource(idR).subscribe(() => {
      console.log('Project disliked successfully.');
      this.ngOnInit();
    }, (error) => {
      console.error('Error disliking project:', error);
    });
  }
  likeRessource(idR: number): void {
    this.ressourceService.likeRessource(idR).subscribe(() => {
      console.log('Project liked successfully.');
      this.ngOnInit();
    }, (error) => {
      console.error('Error liking project:', error);
    });
  }

 
  isImage(url: string): boolean {
    return url.toLowerCase().match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  isVideo(url: string): boolean {
    return url.toLowerCase().match(/\.(mp4|webm|ogg)$/) != null;
  }
  isPDF(url: string): boolean {
    return url.toLowerCase().match(/\.(pdf)$/) != null;
  }

  isDOC(url: string): boolean {
    return url.toLowerCase().match(/\.(doc|docx)$/) != null;
  }

  getSafeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  loadResourceUrl(idRessource: number): void {
    this.ressourceService.loadUrl(idRessource).subscribe(
      (blobData: Blob) => {
        const file = new Blob([blobData], { type: 'application/pdf' });
        const url = URL.createObjectURL(file);
        window.open(url, '_blank');
        console.log('Charger l\'URL du PDF : ', url);
      },
      error => {
        console.error('Erreur lors du chargement de l\'URL de la ressource', error);
        alert('Une erreur s\'est produite lors du chargement du PDF.');
      }
    );
  }
  
  
  
  
  getTypeFromUrl(url: string): string {
    if (this.isImage(url)) {
      return 'image';
    } else if (this.isVideo(url)) {
      return 'video';
    } else if (this.isPDF(url)) {
      return 'pdf';
    } else {
      return '';
    }
  }
  
  displayResource(url: string, type: string): void {
    switch (type) {
      case 'image':
        console.log('Displaying image:', url);
        break;
      case 'video':
        console.log('Displaying video:', url);
        break;
      case 'pdf':
        console.log('Displaying PDF:', url);
        break;
      default:
        console.error('Unknown resource type');
    }
  }
}

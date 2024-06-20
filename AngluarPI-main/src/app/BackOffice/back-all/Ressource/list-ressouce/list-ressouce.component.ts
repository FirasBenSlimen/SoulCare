import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Ressource } from 'src/app/model/Ressource';
import { RessourceService } from 'src/app/services/CategoryRessource/ressource.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser'; 
import { Chart, ChartConfiguration } from 'chart.js/auto'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-ressouce',
  templateUrl: './list-ressouce.component.html',
  styleUrls: ['./list-ressouce.component.css']
})
export class ListRessouceComponent implements AfterViewInit,OnDestroy {
  p: number = 1;
  searchKeyword: string = '';
  ressources: Ressource[] = [];
  statsData: any[] = [];
  chart: Chart;
  chartSubscription: Subscription;
  constructor(private service: RessourceService, private router: Router, public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getRessources();
    this.stat();
  }

  ngAfterViewInit() {
    this.createChart();
  }
  ngOnDestroy() {
    if (this.chartSubscription) {
      this.chartSubscription.unsubscribe();
    }
  }

  getRessources(): void {
    this.service.getAllRessources().subscribe(
      (data: any) => {
        this.ressources = data;
        console.log('ressources:', data);
      },
      error => {
        console.error('Erreur lors de la récupération des ressources', error);
      }
    );
  }

  stat() {
    this.chartSubscription = this.service.getRessourceStatsByCategory().subscribe(
      data => {
        this.statsData = data;
        this.createChart();
      },
      error => {
        console.error('Error getting resource stats', error);
      }
    );
  }

  createChart() {
    const ctx = document.getElementById('myChart');
    if (ctx instanceof HTMLCanvasElement) {
      if (this.chart) {
        this.chart.destroy(); 
      }

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.values(this.statsData),
          datasets: [{
            label: 'Number of Resources',
            data: this.statsData.map((item: any) => item.resourceCount),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Number of Resources by Category',
              font: {
                size: 16
              }
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          }
        }
      });
    } else {
      console.error('Cannot find canvas element to draw the chart.');
    }
  }
 /* createChart() {
    const ctx = document.getElementById('myChart');
    if (ctx instanceof HTMLCanvasElement) {
      if (this.chart) {
        this.chart.destroy(); 
      }
  
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.values(this.statsData),
          datasets: [{
            label: 'Number of Resources',
            data: this.statsData.map((item: any) => item.resourceCount),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 0, 0, 1)', // rouge
              'rgba(0, 0, 255, 1)', // bleu
              'rgba(0, 255, 0, 1)', // vert
            ],
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Number of Resources by Category',
              font: {
                size: 16
              }
            },
            legend: {
              display: true,
              position: 'bottom'
            }
          }
        }
      });
    } else {
      console.error('Cannot find canvas element to draw the chart.');
    }
  }*/

  
  
  
  desaffecterRessource(id: number): void {
    this.service.desaffecterRessource(id).subscribe(() => {
      this.ressources = this.ressources.filter(ressource => ressource.idR !== id);
      this.ngOnInit();
    });
  }

  deleteRessource(id: number): void {
    this.service.deleteRessource(id).subscribe(() => {
      this.ressources = this.ressources.filter(ressource => ressource.idR !== id);
    });
  }

  updateRessource(id: any) {
    this.router.navigate(['admin/modifyRessource' + '/' + id]);
  }

  searchRessources(): void {
    if (this.searchKeyword.trim() !== '') {
      this.service.searchRessource(this.searchKeyword).subscribe(
        data => {
          this.ressources = data;
          console.log('Search results:', data);
        },
        error => {
          console.error('Erreur lors de la recherche des ressources', error);
        }
      );
    } else {
      this.ngOnInit();
    }
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
    this.service.loadUrl(idRessource).subscribe(
      blobData => {
        const file = new Blob([blobData], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(file);
        const type = this.getTypeFromUrl(url);
        this.displayResource(url, type);
        console.log('Charger l\'URL : ', url);
      },
      error => {
        console.error('Erreur lors du chargement de l\'URL de la ressource', error);
        alert('Une erreur s\'est produite lors du chargement du PDF.');
        // Affichez l'erreur ou effectuez une action de gestion appropriée
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

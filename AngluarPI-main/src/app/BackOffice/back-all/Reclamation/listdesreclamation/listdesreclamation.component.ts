import { Component } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation/reclamation.service';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/model/reclamation';
import { Chart } from 'chart.js/auto';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listdesreclamation',
  templateUrl: './listdesreclamation.component.html',
  styleUrls: ['./listdesreclamation.component.css']
})
export class ListdesreclamationComponent {
  reclamations: Reclamation[]=[];
  searchKeyword: string = '';
  p: number = 1;
  reclamationStats: any = [];
  reponseContenu: string = '';

  constructor(private service: ReclamationService, private router: Router) { }
  
  ngOnInit() {
   this.getReclamations();
   this.stat();
  }
  stat() {
    this.service.getReclamationStats().subscribe(
      data => {
        this.reclamationStats = data;
        this.createChart();
      },
      error => {
        console.error('Error getting reclamation stats', error);
      }
    );
  }
  getReclamations(): void {
    this.service.listreclamation().subscribe(
      (data:any) => {
        this.reclamations = data;
        console.log('tasks:', data);

      },
      error => {
        console.error('Erreur lors de la récupération des tasks', error);
      }
    );
  }
  
 
  
  deleteReclamation(id: number): void {
    this.service.deleteReclamation(id)
      .subscribe(() => {
        this.reclamations = this.reclamations.filter(reclamationn => reclamationn.id !== id);
      });
  }
  


  searchReclamations(): void {
    if (this.searchKeyword.trim() !== '') {
      this.service.searchReclamations(this.searchKeyword).subscribe(
        data => {
          this.reclamations = data;
          console.log('Search results:', data);
        },
        error => {
          console.error('Erreur lors de la recherche des taks', error);
        }
      );
    } else {
      this.ngOnInit();
    }
  }


  createChart() {
    const ctx = document.getElementById('myChart');
    if (ctx instanceof HTMLCanvasElement) {
      const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(this.reclamationStats),
        datasets: [{
          label: '# Of Issues',
          data: Object.values(this.reclamationStats),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  } else {
    console.error('Cannot find canvas element to draw the chart.');
  }
  }



  openResponseForm(reclamation: Reclamation): void {
    this.router.navigate(['admin/reponse', reclamation.id], { state: { reclamationDetails: reclamation, user: reclamation.user } });
}


}

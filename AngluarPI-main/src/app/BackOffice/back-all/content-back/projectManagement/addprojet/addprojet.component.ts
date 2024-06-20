import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project,EtatProject } from 'src/app/core/models/project';
import { ProjetService } from 'src/app/core/services/projet.service';
import { CsvService } from 'src/app/csvService/csv.service';
@Component({
  selector: 'app-addprojet',
  templateUrl: './addprojet.component.html',
  styleUrls: ['./addprojet.component.css']
})
export class AddprojetComponent {
  project: Project = new Project();
  id: number | undefined;
  etatValues = Object.values(EtatProject);
  csvData: Project [];
  // Inject the CSV service here

    constructor(private projetService: ProjetService ,private router:Router,private ac:ActivatedRoute,private csvService: CsvService ) {}
    ngOnInit(): void {
    }
    addCsv(f: NgForm): void {
      if (this.csvData && this.csvData.length > 0) {
        for (let i = 0; i < this.csvData.length - 1; i++) {
          console.log(this.csvData[i]);
          this.projetService.addProject(this.csvData[i]).subscribe({
            next: () => {
              this.projetService.getProjects().subscribe({
                next: (data: Project[]) => this.csvData = data,
                error: (err) => console.log(err),
                complete: () => console.log("I'm completed")
              });
            },
            error: (err) => console.log(err),
            complete: () => console.log("I'm completed")
          });
        }
      } else {
        console.error('CSV data is undefined or empty.');
        // Handle the error as needed
      }
    }

    handleFileInput(event: any): void {
      const file = event.target.files[0];
      if (file) {
        this.csvService.readCsvFile(file).subscribe(
          data => {
            this.csvData=data;
          },
          error => {
            console.error('Error reading CSV file:', error);
            // Handle the error as needed
          }
        );
      }
    }
    add(f: NgForm) {
      const newProject: Project = {
        title: 'Project Title',
        dateDebut: "26/08/2014",
        dateFinPrevu: "26/01/2014",
        idProject: 1,
        description: 'Project Description',
        prototype: 'Prototype',
        image: 'Image URL',
        file: undefined,
        etatProject: EtatProject.TODO,
        comments: [] // Initialize as an empty array
        ,
        defaultImage: ''
      };
      newProject.image = 'assets/BackOffice/assets/img/bg7.jpg';
      this.project = newProject;
      console.log(this.project);
      this.projetService.addProject(this.project).subscribe({
        next: () => {
          this.projetService.getProjects().subscribe(() => {
            // Navigate to the project list page
            this.router.navigate(['/admin/projects']);
          });
        },
        error: (err) => console.log(err),
      });
    }


}

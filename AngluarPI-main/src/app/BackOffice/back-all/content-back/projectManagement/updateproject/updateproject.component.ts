import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project,EtatProject} from 'src/app/core/models/project';
import { ProjetService } from 'src/app/core/services/projet.service';


@Component({
  selector: 'app-updateproject',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.css']
})
export class UpdateprojectComponent implements OnInit {
  project: Project = new Project();
  id: number | undefined;
  etatValues = Object.values(EtatProject);
  selectedImage: File | null = null;




  constructor(
    private projetService: ProjetService,
    private router: Router,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    // Retrieve the project ID from route params
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
        // Fetch the project details
        this.projetService.getProject(this.id).subscribe(
        {
            next: (data: Project) => (this.project = data),
            error: (err) => console.log(err)
        }
        );
    }
}
handleImageInput(event: any) {
  this.selectedImage = event.target.files[0];
}

  edit(f: NgForm) {

      this.projetService.updateProject(this.project.idProject, this.project).subscribe({
        next: () => this.router.navigate(['/admin/projects']),
        error: (err) => console.log(err),
      });
    }

  }


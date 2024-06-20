import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/core/models/project';
import { ProjetService } from 'src/app/core/services/projet.service';

@Component({
  selector: 'app-projet-dtail',
  templateUrl: './projet-dtail.component.html',
  styleUrls: ['./projet-dtail.component.css']
})
export class ProjetDetailComponent implements OnInit {
  @Input() project: Project;
  newComment: string;
  projectId: number;
  allprojects: Project[] = [];
  selectedProject: Project | null = null;

  constructor(
    private route: ActivatedRoute,
    private projetService: ProjetService,
    private router: Router
  ) {
    this.projectId = 0;
    this.project = new Project();
  }

  ngOnInit(): void {
    const projectId = this.route.snapshot.params['id'];
    this.projetService.getProject(projectId).subscribe(project => {
      this.project = project;
    });
  }

  navigateToUpdateProject(projectId: number): void {
    this.router.navigate(['/admin/projects/updateProject', projectId]);
  }

  fetchProjects() {
    this.projetService.getProjects().subscribe({
      next: (projects) => {
        this.allprojects = projects;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  deleteProject(projectId: number) {
    this.projetService.deleteProject(projectId).subscribe({
      next: () => {
        this.fetchProjects();
      },
      error: (err) => {
        console.error('Error deleting project:', err);
      }
    });
  }

  onUpdateProject(projectId: number | undefined) {
    if (projectId !== undefined) {
      this.router.navigate(['/admin/projects/updateProject', projectId]);
    } else {
      console.error('Project ID is undefined');
    }
  }

  onDeleteProject(projectId: number | undefined) {
    if (projectId) {
      this.projetService.deleteProject(projectId).subscribe(
        () => {
          console.log('Project deleted successfully');
          this.router.navigate(['/admin/projects']);
        },
        (error) => {
          console.error('Error deleting project:', error);
        }
      );
    } else {
      console.error('Project ID is undefined');
    }
  }
}

// projet.component.ts

import { Component, OnInit } from '@angular/core';
import { ProjetService } from 'src/app/core/services/projet.service';
import { Project, Comment } from 'src/app/core/models/project';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  allprojects: Project[] = [];
  selectedProject: Project | null = null;
  newComment: string = '';
  constructor(
    private projetService: ProjetService,
    private router: Router,
    private likeService: ProjetService
  ) { }

  ngOnInit(): void {
    this.fetchProjects();
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

  navigateToUpdateProject(projectId: number): void {
    this.router.navigate(['/admin/projects/updateProject', projectId]);
  }

  deleteProject(projectId: number): void {
    this.projetService.deleteProject(projectId).subscribe({
      next: () => {
        this.fetchProjects();
      },
      error: (err) => {
        console.error('Error deleting project:', err);
      }
    });
  }

  addComment(projectId: number, form: NgForm): void {

    const newComment: Comment = {
      commentId: form.value.commentId,
      content: form.value.content,
      timestamp: new Date(),

    };

    this.projetService.addCommentToProject(projectId, newComment as any).subscribe({
      next: () => {
        console.log('Comment added successfully');
        form.resetForm();
        this.newComment = ''; // Clear the comment input field
        this.fetchProjects(); // Reload the list of projects
      },
      error: (err) => {
        console.error('Error adding comment:', err);
      }
    });
  }

  viewProjectDetails(projectId: number): void {
    console.log('Project ID:', projectId);
    this.router.navigate(['/admin/projects/', projectId]);
  }


 // projet.component.ts

deleteComment(projectId: number, commentId: number): void {
  // Find the project with the given projectId
  const project = this.allprojects.find(project => project.idProject === projectId);
  if (project) {
    // Find the index of the comment with the given id within the project's comments array
    const commentIndex = project.comments.findIndex(comment => comment.commentId === commentId);
    if (commentIndex !== undefined && commentIndex !== -1) {
      // Delete the comment from the project's comments array
      project.comments.splice(commentIndex, 1);
      // Call your service to update the comment in the database
    }
  }
}

likeProject(projectId: number): void {
  let likes = JSON.parse(localStorage.getItem('projectLikes')) || {};
  likes[projectId] = (likes[projectId] || 0) + 1;
  localStorage.setItem('projectLikes', JSON.stringify(likes));
}

dislikeProject(projectId: number): void {
  let dislikes = JSON.parse(localStorage.getItem('projectDislikes')) || {};
  dislikes[projectId] = (dislikes[projectId] || 0) + 1;
  localStorage.setItem('projectDislikes', JSON.stringify(dislikes));
}

getLikes(projectId: number): number {
  const likes = JSON.parse(localStorage.getItem('projectLikes')) || {};
  return likes[projectId] || 0;
}
getDislikes(projectId: number): number {
  const dislikes = JSON.parse(localStorage.getItem('projectDislikes')) || {};
  return dislikes[projectId] || 0;
}


}

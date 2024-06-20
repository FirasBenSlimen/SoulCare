import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PostService } from 'src/app/services/post/post.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-liste-posts',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListePostComponent implements OnInit {
  posts: Post[] = []; // Tableau pour stocker les posts récupérés
  searchKeyword: string = ''; // Variable pour la recherche
  p: number = 1; // Pagination

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getPosts(); // Appel de la méthode pour récupérer les posts lors de l'initialisation du composant
  }

  // Méthode pour récupérer les posts depuis le service
  getPosts(): void {
    this.postService.getAllPosts().subscribe(
      (data: Post[]) => {
        this.posts = data;
        console.log('Posts:', data);
      },
      error => {
        console.error('Erreur lors de la récupération des posts', error);
      }
    );
  }

  // Méthode pour supprimer un post
  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(
      () => {
        this.posts = this.posts.filter(post => post.id !== id);
      },
      error => {
        console.error('Erreur lors de la suppression du post', error);
      }
    );
  }

  // Méthode pour rechercher des posts
  searchPosts(): void {
    if (this.searchKeyword.trim() !== '') {
        this.postService.searchPosts(this.searchKeyword).subscribe(
            (data: Post[]) => {
                this.posts = data;
                console.log('Résultats de la recherche:', data);
            },
            error => {
                console.error('Erreur lors de la recherche des posts', error);
            }
        );
    } else {
        this.getPosts(); // If the search is empty, get all posts
    }
}
}

// project.model.ts

export enum EtatProject {
  TODO = 'TODO',
  INPROGRESS = 'INPROGRESS',
  DONE = 'DONE'
}

export class Project {
  idProject!: number;
  title!: string;
  description!: string;
  prototype!: string;
  image!: string;
  defaultImage: string;
  file!: File; // Assurez-vous que ce champ est correctement défini
  etatProject!: EtatProject;
  dateDebut!: string;
  dateFinPrevu!: string;
  reactionProjects?: ReactionProject;
  comments: Comment[] = []; // Initialisez comme un tableau vide
}

export class Comment {
  commentId?: number;
  content?: string;
  timestamp?: Date;
  // Ajoutez d'autres propriétés de commentaire si nécessaire
}
export class ReactionProject {
  reactionId?: number;
  isLiked?: boolean;
  isDisliked?: boolean; // Add property for dislike
  timestamp?: Date;
}


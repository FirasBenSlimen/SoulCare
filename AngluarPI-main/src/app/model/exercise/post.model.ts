import { Comment } from './comment.model';
import { Exercise } from './exercise.model';

export class Post {
  id: number;
  author: string;
  content: string;
  datePosted: string; // Assuming date is serialized as string
  likes: number;
  dislikes: number;
  image ?: string;
  comments: Comment[];
  exercises: Exercise[];
}

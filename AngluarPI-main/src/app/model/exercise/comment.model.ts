import { Post } from './post.model';

export class Comment {
  id: number;
  content: string;
  date: string; // Assuming date is serialized as string
  post: Post;
}

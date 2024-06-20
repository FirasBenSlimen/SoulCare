import { CategoryExercise } from './category-exercise.model';
import { Post } from './post.model';
import { ExerciseMedia } from './exercise-media.model';
import { DifficultyLevels } from './difficulty-levels.enum';
import { StressLevelReductions } from './stress-level-reductions.enum';

export class Exercise {
  exerciseId: number;
  title: string;
  description: string;
  difficultyLevel: DifficultyLevels;
  duration: number;
  stressLevelReduction: StressLevelReductions;
  categorie: CategoryExercise;
  posts: Post[];
  exercicemedias: ExerciseMedia[];

  constructor() {
    this.exerciseId = null; // or initialize with any default value you prefer
    this.title = '';
    this.description = '';
    this.difficultyLevel = DifficultyLevels.Beginner; // or any default value from the enum
    this.duration = 0; // or any default value
    this.stressLevelReduction = StressLevelReductions.LEVEL_1; // or any default value from the enum
    this.categorie = new CategoryExercise(); // Initialize category object
    this.posts = []; // or initialize with any default value
    this.exercicemedias = []; // or initialize with any default value
  }
}

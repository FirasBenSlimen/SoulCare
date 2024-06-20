import { Exercise } from './exercise.model';

export class CategoryExercise {
  categoryId: number = 0;
  title: string = '';
  description: string = '';
  benefits: string = '';
  exercises: Exercise[] = [];
constructor (){}
  // Getters
  get categoryIde(): number {
    return this.categoryId;
  }

  get titlee(): string {
    return this.title;
  }

  get descriptione(): string {
    return this.description;
  }

  get benefitse(): string {
    return this.benefits;
  }

  get exercisese(): Exercise[] {
    return this.exercises;
  }

  // Setters
  set categoryIde(categoryId: number) {
    this.categoryId = categoryId;
  }

  set titlee(title: string) {
    this.title = title;
  }

  set descriptione(description: string) {
    this.description = description;
  }

  set benefitse(benefits: string) {
    this.benefits = benefits;
  }

  set exercisese(exercises: Exercise[]) {
    this.exercises = exercises;
  }
}

import { Component, OnInit } from '@angular/core';
import { SExerciseService } from 'src/app/services/exercise/s-exercise.service';
import { Exercise } from 'src/app/model/exercise/exercise.model';
import { SCategoryService } from 'src/app/services/exercise/s-category.service';
import { CategoryExercise } from 'src/app/model/exercise/category-exercise.model';

@Component({
  selector: 'app-exercise-category',
  templateUrl: './exercise-category.component.html',
  styleUrls: ['./exercise-category.component.css']
})
export class ExerciseCategoryComponent implements OnInit {
  p: number = 1;
  exercises: Exercise[] = [];
  showAddForm: boolean = false;
  newExercise: Exercise = new Exercise();
  searchKeyword: string = '';
  categories: CategoryExercise[] = [];
  selectedCriteria: string = 'description'; // Default selected criteria






  constructor(private exerciseService: SExerciseService, private service: SCategoryService) { }
  onCriteriaChange() {
    this.getExercisesByCriteriaAndValue(); // Call the search function when criteria changes
  }
  getExercisesByCriteriaAndValue() {
    this.exerciseService.getExercisesByCriteriaAndValue(this.selectedCriteria, this.searchKeyword).subscribe(
      (data: Exercise[]) => {
        this.exercises = data;
        console.log('Exercises fetched successfully:', data);
      },
      error => {
        console.error('Error occurred while fetching exercises:', error);
      }
    );
  }
  ngOnInit() {
    this.getExercises();
    this.getCategories();
  }
  addExercise(): void {
    // Find the category based on its ID
    const selectedCategory = this.categories.find(category => category.categoryId == this.newExercise.categorie.categoryId);
  
    if (selectedCategory) {
      // Set the category for the new exercise
      this.newExercise.categorie = selectedCategory;
  
      // Add the new exercise
      this.exerciseService.addExercise(this.newExercise)
        .subscribe((response: Exercise) => {
          console.log('New exercise added:', response);
          this.exercises.push(response);
          this.toggleAddForm();
          this.newExercise = new Exercise();
         });
    } else {
      console.error('Category not found for the provided ID:', this.newExercise.categorie.categoryId);
    }
  }
  

  getCategories(): void {
    this.service.getAllCategories().subscribe(
      (data: CategoryExercise[]) => { // Corrected data type
        this.categories = data;
        console.log('Categories exercise:', data);
      },
      error => {
        console.error('Erreur lors de la récupération des catégories', error); // Corrected error message
      }
    );
  }
  getExercises(): void {
    
    this.exerciseService.getAllExercises().subscribe(
      (data: Exercise[]) => {
        this.exercises = data;
        console.log('hehda eli jeni:', data);
      },
      error => {
        console.error('Error while retrieving exercises', error);
      }
    );
  }

  deleteExercise(id: number): void {
    this.exerciseService.deleteExercise(id)
      .subscribe(() => {
        this.exercises = this.exercises.filter(exercise => exercise.exerciseId !== id);
      });
  }

  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }


  searchExercises(): void {
    if (this.searchKeyword.trim() !== '') {
      this.exerciseService.searchExercise(this.searchKeyword).subscribe(
        data => {
          this.exercises = data;
          console.log('Search results:', data);
        },
        error => {
          console.error('Error while searching exercises', error);
        }
      );
    } else {
      this.getExercises();
    }
  }
  updateExercise(): void {
    const selectedCategory = this.categories.find(category => category.categoryId == this.newExercise.categorie.categoryId);
    this.newExercise.categorie = selectedCategory;

    console.log('the new obj:', this.newExercise);
    this.exerciseService.updateExercise(this.newExercise.exerciseId,this.newExercise)
      .subscribe((response: Exercise) => {
        console.log('Exercise updated:', response);
        this.toggleAddForm(); 
        this.newExercise = new Exercise(); 
        this.getExercises();
      });
  }
  editExercise(exercise: Exercise): void {
    this.newExercise = { ...exercise }; 
    this.showAddForm = true; 
  }
  



}

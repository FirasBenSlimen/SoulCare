import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from 'src/app/model/exercise/exercise.model';
import { SExerciseService } from 'src/app/services/exercise/s-exercise.service';

@Component({
  selector: 'app-exercisedetails',
  templateUrl: './exercisedetails.component.html',
  styleUrls: ['./exercisedetails.component.css']
})
export class ExercisedetailsComponent {
   exercise: Exercise; // Store the first exercise

    exerciseId:string; 
  constructor(private route: ActivatedRoute, private exerciseService: SExerciseService) {}

  ngOnInit(): void {
    // Extract exercise ID from route parameters and fetch exercise details (assuming you have a service to fetch exercise details by ID)
    const exerciseId = this.route.snapshot.paramMap.get('id');
    // Fetch exercise details using exerciseId
   this.getexercisewithid(exerciseId);

  }
  getexercisewithid(exerciseId: string): void {
    this.exerciseService.getExercisesByCriteriaAndValue('exerciseId', exerciseId).subscribe(
      (data: Exercise[]) => {
        if (data && data.length > 0) {
          this.exercise = data[0]; // Get the first exercise from the result
          console.log('First exercise fetched successfully:', this.exercise);
        } else {
          console.log('No exercise found for the given criteria.');
        }
      },
      error => {
        console.error('Error occurred while fetching exercises:', error);
      }
    );
  }
  // Function to check if URL is for an image
isImageUrl(url: string): boolean {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
  const lowerCaseUrl = url.toLowerCase();
  return imageExtensions.some(ext => lowerCaseUrl.endsWith(ext));
}

  getExerciseMediaUrl(exercise: Exercise): string {
    // Check if exerciseMedias array is not empty before accessing its first item
    console.log('hello', exercise);
    
    // Check if mediaUrl is not null or undefined
    if (exercise.exercicemedias && exercise.exercicemedias[0] && exercise.exercicemedias[0].mediaUrl) {
      return "../../../../../assets/FrontOffice/exerciseimg/" + exercise.exercicemedias[0].mediaUrl;
    } else {
      // Return default path if mediaUrl is null or undefined
      return "../../../../../assets/FrontOffice/exerciseimg/default.jpg";
    }
  }
}

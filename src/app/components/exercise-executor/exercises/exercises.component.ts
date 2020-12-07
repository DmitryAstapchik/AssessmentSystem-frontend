import { Component, OnInit } from '@angular/core';
import { ExerciseForList } from '../../../models/exercise-executor/exercise-for-list';
import { ExerciseListService } from '../../../services/exercise-executor/exercise-list.service';
import { AuthService } from '../../../services/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.css']
})

export class ExerciseListComponent implements OnInit {
  exercises: ExerciseForList[];

  constructor(private exerciseListService: ExerciseListService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.authService.checkAccess(ExerciseListComponent.name)) {
      this.router.navigate(['denied']);
    }
    this.getCandidateExercises();
  }

  getCandidateExercises(): void {
    this.exerciseListService.getCandidateExercises()
    .subscribe(exercises => this.exercises = exercises);
  }
}

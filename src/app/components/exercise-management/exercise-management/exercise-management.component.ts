import { Component, OnInit } from '@angular/core';
import { TaskInfo } from '../../../models/exercise-management/task-info';
import { ExerciseManagementService } from '../../../services/exercise-management/exercise-management.service';
import { AuthService } from '../../../services/security/auth.service';
import { Router } from '@angular/router';
import { Exercise } from '../../../models/exercise-management/exercise';

@Component({
  selector: 'app-exercise-management.component',
  templateUrl: './exercise-management.component.html',
  styleUrls: ['./exercise-management.component.css']
})
export class ExerciseManagementComponent implements OnInit {

  tasks: Exercise[];
  //selectedTask: TaskInfo;
  tests: Exercise[];

  constructor(private exerciseManagementService: ExerciseManagementService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.authService.checkAccess(ExerciseManagementComponent.name)) {
      this.router.navigate(['denied']);
    }
    //this.getTaskNameAndId();
    this.getTestInfos();
    this.getTaskInfos();
  }

  //getTaskNameAndId(): void {
  //  this.exerciseManagementService.getTaskNameAndId().subscribe(tasks => this.tasks = tasks);
  //}

  getTestInfos(): void {
    this.exerciseManagementService.getTestInfos().subscribe(tests => this.tests = tests);
  }

  getTaskInfos(): void {
    this.exerciseManagementService.getTaskInfos().subscribe(tasks => this.tasks = tasks);
  }

  deleteTest(id: number) {
    if (confirm('Delete the test?')) {
      this.exerciseManagementService.deleteTest(id).subscribe(
        () => this.tests = this.tests.filter(t => t.id != id));
    }
  }

  deleteTask(taskId: number): void {
    if (confirm('Delete the task?')) {
      this.exerciseManagementService.deleteTask(taskId).subscribe(
        () => this.tasks = this.tasks.filter(t => t.id !== taskId));
    }
  }

  //select(taskInfo: TaskInfo) { this.selectedTask = taskInfo; }
}

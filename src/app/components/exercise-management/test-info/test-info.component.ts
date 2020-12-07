import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExerciseManagementService } from '../../../services/exercise-management/exercise-management.service';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { TestQuestion } from '../../../models/exercise-management/test-question';
import { Test } from '../../../models/exercise-management/test';
import { TestAnswerVariant } from '../../../models/exercise-management/test-answer-variant';

@Component({
  selector: 'app-test-info',
  templateUrl: './test-info.component.html',
  styleUrls: ['./test-info.component.css']
})
export class TestInfoComponent implements OnInit {

  private test: Test = new Test();
  private testId = +this.route.snapshot.paramMap.get('id');
  private createNew: boolean;

  constructor(
    private exerciseManagementService: ExerciseManagementService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    if (this.location.path().includes('/exerciseManagement/editTest')) {
      this.exerciseManagementService.getTest(this.testId).subscribe(t => this.test = t);
    }
    else if (this.location.path().includes('/exerciseManagement/createTest')) {
      this.createNew = true;
    }
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('button.close').click(function () {
        $('#alertSaved').hide();
      });
    });
  }

  save() {
    document.getElementById("saveButton").setAttribute("disabled", "true");
    this.exerciseManagementService.updateTest(this.test).subscribe(
      () => this.router.navigate(["/exerciseManagement"]));
    //document.getElementById("saveButton").removeAttribute("disabled");
   // $("#alertSaved").show();
  }

  private chooseVariant(question: TestQuestion, variant: TestAnswerVariant) {
    if (variant.isCorrect == false) {
      for (let v of question.answerVariants) {
        if (v != variant) {
          v.isCorrect = false;
        }
        variant.isCorrect = true;
      }
    }
  }

  addQuestion() {
    this.test.questions.push(new TestQuestion());
    console.log(this.test.questions.length);
  }

  createTest(test: Test) {
    document.getElementById("buttonCreate").setAttribute("disabled", "true");
    this.exerciseManagementService.addTest(test).subscribe(
      () => this.router.navigate(["/exerciseManagement"]));
  }

  removeQuestion(question: TestQuestion) {
    this.test.questions.splice(this.test.questions.indexOf(question), 1);
  }

  setTime(event) {
    if (event.target.checked) {
      this.test.timeMinutes = 5;
    }
    else {
      this.test.timeMinutes = 0;
    }
  }
}

import { Component, OnInit, Input, ViewChild, AfterContentChecked } from '@angular/core';
import { TaskInfo } from '../../../models/exercise-management/task-info';
import { ExerciseManagementService } from '../../../services/exercise-management/exercise-management.service';
import { Assembly } from '../../../models/exercise-management/assembly';
import { Location } from '@angular/common';
import { AuthService } from '../../../services/security/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../../models/exercise-management/task';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})

export class TaskInfoComponent implements OnInit, AfterContentChecked {
  @Input() task: Task = new Task();

  exercises: Task[] = [];
  assemblies: Assembly[] = [];

  public enableTime = false;
  public isButtonDisabled = true;
  public isClassNameDisabled = true;
  public isMethodNameDisabled = true;
  public id = +this.route.snapshot.paramMap.get('id');

  public currentAssembly = {
    'assemblyName': '',
    'testClassesElements':
      [
        {
          'name': '',
          'methodsNames': []
        }
      ]
  };

  public currentClassElement = {
    'name': '',
    'methodsNames': []
  };

  public initialTask = {
    'codeTemplate': '',
    'assemblyName': '',
    'testClassName': '',
    'testMethodName': '',
    'tips': '',
    'id': 0,
    'name': '',
    'subject': '',
    'description': '',
    'maximumScore': 10,
    'timeMinutes': 0,
  };

  public currentPath;
  editedExercise: TaskInfo;

  constructor(
    private route: ActivatedRoute,
    private exerciseManagementService: ExerciseManagementService,
    private location: Location,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    if (!this.authService.checkAccess(TaskInfoComponent.name)) {
      this.router.navigate(['denied']);
    }
    this.getExercise();
    this.getAssembliesElements();
    if (this.id === 0) {
      this.task.assemblyName = 'Choose...';
      this.task.testClassName = 'Choose...';
      this.task.testMethodName = 'Choose...';
    }
    this.currentPath = this.location.path();
  }

  ngAfterContentChecked() {
    if (this.task !== undefined && this.id !== 0) {
      this.isClassNameDisabled = false;
      this.isMethodNameDisabled = false;
      this.currentAssembly = this.getNecessaryAssembly(this.task.assemblyName);
      if (this.task.testClassName !== 'Choose...' && this.task.testMethodName !== 'Choose...') {
        this.currentClassElement = this.getNecessaryClass(this.task.testClassName);
      }
    }
  }

  getAssembliesElements(): void {
    this.exerciseManagementService.getAssembliesElements().subscribe(assemblies => this.assemblies = assemblies);
  }

  getExercise(): void {
    //if (this.id === 0) {
    //  this.task = this.initialTask;
    //  return;
    //}

    if (this.id != 0) {
      this.exerciseManagementService.getTask(this.id).subscribe(exercise => {
        this.task = exercise;
        this.task.tips = exercise.tips.join('\n');
        if (exercise.timeMinutes == null) {
          this.enableTime = false;
        }
      });
    }

  }

  addNewExercise(codeTemplate: string, assemblyName: string, testClassName: string,
    testMethodName: string, tip: string, id: number = 1, name: string, subject: string,
    description: string, maximumScore: number): void {
    document.getElementById('buttonCreate').setAttribute('disabled', 'true');
    if (!this.enableTime) {
      this.task.timeMinutes = null;
    }
    let tips = null;
    if (!(tip.length === 1 && tip[0] === '')) {
      tips = tip.split('\n');
      for (let i = 0; i < tips.length; i++) {
        tips[i] = tips[i].trim();
      }
    }
    this.exerciseManagementService.addTask({
      codeTemplate, assemblyName, testClassName, testMethodName,
      tips, id, name, subject, description, maximumScore, timeMinutes: this.task.timeMinutes
    } as Task)
      .subscribe(exercise => {
        this.exercises.push(exercise);
        this.router.navigate(["/exerciseManagement"]);
      });
  }

  save(tip: string): void {
    this.task.tips = null;
    if (tip !== '') {
      try {
        this.task.tips = tip.split('\n');
        for (let i = 0; i < this.task.tips.length; i++) {
          this.task.tips[i] = this.task.tips[i].trim();
        }
      } catch {
      }
    }

    if (!this.enableTime) {
      this.task.timeMinutes = null;
    }

    document.getElementById('buttonSave').setAttribute('disabled', 'true');
    this.exerciseManagementService.updateTask(this.task)
      .subscribe(value => { }, error => { }, () => this.router.navigate(["/exerciseManagement"]));
  }

  onSelectAssemblyName = (e) => {
    this.task.testClassName = 'Choose...';
    this.task.testMethodName = 'Choose...';
    this.isClassNameDisabled = false;
    this.currentAssembly = this.getNecessaryAssembly(e.target.value);
    this.currentClassElement = {
      'name': '',
      'methodsNames': []
    };
  }

  onSelectClassName = (e) => {
    this.isMethodNameDisabled = false;
    this.currentClassElement = this.getNecessaryClass(e.target.value);
    this.task.testMethodName = 'Choose...';
    this.isButtonDisabled = false;
  }

  getNecessaryAssembly = (value) => {
    let result = this.assemblies.filter((assembly) => assembly.assemblyName === value).pop();
    if (result === undefined) {
      result = {
        'assemblyName': '',
        'testClassesElements':
          [
            {
              'name': '',
              'methodsNames': []
            }
          ]
      };
    }

    return result;
  }

  getNecessaryClass = (value) => {
    let result = this.currentAssembly.testClassesElements.filter((classElement) => classElement.name === value).pop();
    if (result === undefined) {
      result = {
        'name': '',
        'methodsNames': []
      };
    }

    return result;
  }

  setTime(event) {
    if (event.target.checked) {
      this.task.timeMinutes = 5;
    }
    else {
      this.task.timeMinutes = null;
    }
  }
}

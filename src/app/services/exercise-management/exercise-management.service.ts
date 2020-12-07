import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Assembly } from '../../models/exercise-management/assembly';
import { TaskInfo } from '../../models/exercise-management/task-info';
import { AuthService } from '../security/auth.service';
import { environment } from '../../../environments/environment';
import { Task } from '../../models/exercise-management/task';
import { Test } from '../../models/exercise-management/test';
import { Exercise } from '../../models/exercise-management/exercise';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });


@Injectable()
export class ExerciseManagementService {

  private assembliesElementsUrl = environment.apiUrl + 'api/v1/assemblyInfo/elements';
  private exerciseInfoListUrl = environment.apiUrl + 'api/v1/exercises/names-and-ids';
  private exerciseInfoUrl = environment.apiUrl + 'api/v1/exercises/create-task';
  private deleteExerciseUrl = environment.apiUrl + 'api/v1/exercises';
  private exerciseForEditUrl = environment.apiUrl + 'api/v1/exercises/task';
  private updateExerciseUrl = environment.apiUrl + 'api/v1/exercises/update-task';
  private readonly testsUrl = environment.apiUrl + 'api/v1/exercises/tests';
  private readonly testsInfoUrl = this.testsUrl + '/info';
  private readonly tasksUrl = environment.apiUrl + 'api/v1/exercises/tasks';
  private readonly tasksInfoUrl = this.tasksUrl + '/info';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAssembliesElements(): Observable<Assembly[]> {
    return this.http.get<Assembly[]>(this.assembliesElementsUrl, { headers: this.authService.getAuthHeader() });
  }

  getTaskNameAndId(): Observable<TaskInfo[]> {
    return this.http.get<TaskInfo[]>(this.exerciseInfoListUrl, { headers: this.authService.getAuthHeader() });
  }

  getTestInfos(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.testsInfoUrl, { headers: this.authService.getAuthHeader() });
  }

  getTaskInfos(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.tasksInfoUrl, { headers: this.authService.getAuthHeader() });
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.exerciseInfoUrl, task, { headers: this.authService.addAuthHeader(headers) });
  }

  addTest(test: Test): Observable<any> {
    return this.http.post<Test>(this.testsUrl, test, { headers: this.authService.addAuthHeader(headers) });
  }

  getTask(id: number): Observable<Task> {
    const url = `${this.exerciseForEditUrl}/${id}`;
    return this.http.get<Task>(url, { headers: this.authService.getAuthHeader() });
  }

  getTest(testId: number): Observable<Test> {
    return this.http.get<Test>(this.testsUrl + `/${testId}`, { headers: this.authService.getAuthHeader() })
  }

  deleteTask(taskId: number): Observable<TaskInfo> {
   // const id = typeof taskInfo === 'number' ? taskInfo : taskInfo.item2;
   // const url = `${this.deleteExerciseUrl}/${id}`;

    return this.http.delete<TaskInfo>(this.tasksUrl + `/${taskId}`, { headers: this.authService.getAuthHeader() });
  }

  deleteTest(testId: number): Observable<any> {
    return this.http.delete(this.testsUrl + `/${testId}`, { headers: this.authService.getAuthHeader() });
  }

  updateTask(task: Task): Observable<any> {
    return this.http.put(this.updateExerciseUrl, task, { headers: this.authService.addAuthHeader(headers) });
  }

  updateTest(test: Test): Observable<any> {
    return this.http.put(this.testsUrl + `/${test.id}`, test, { headers: this.authService.addAuthHeader(headers) });
  }
}

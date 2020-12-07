import { Injectable } from '@angular/core';
import { ExerciseForList } from '../../models/exercise-executor/exercise-for-list';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { StorageService } from '../security/storage.service';
import { AuthService } from '../security/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ExerciseListService {

  private exerciseForListUrl = environment.apiUrl + 'api/v1/exercises/candidate';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCandidateExercises(): Observable<ExerciseForList[]> {

    return this.http.get<ExerciseForList[]>(this.exerciseForListUrl, { headers: this.authService.getAuthHeader() });
  }
}

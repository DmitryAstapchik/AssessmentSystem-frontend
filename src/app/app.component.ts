import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/security/storage.service';
import { AuthService } from './services/security/auth.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { ExerciseListComponent } from './components/exercise-executor/exercises/exercises.component';
import { TaskValidationComponent } from './components/exercise-executor/task-validation/task-validation.component';
import { UserListComponent } from './components/user-management/accounts/accounts.component';
import { AssemblyManagementComponent } from './components/exercise-management/assembly-management/assembly-management.component';
import { InvitesSenderComponent } from './components/user-management/invites-sending/invites-sending.component';
import { ExerciseManagementComponent } from './components/exercise-management/exercise-management/exercise-management.component';
import { TaskInfoComponent } from './components/exercise-management/task-info/task-info.component';
import { environment } from '../environments/environment';
import { UserInfoComponent } from './components/user-management/user-info/user-info.component';
import { ViewResultComponent } from './components/exercise-executor/task-result/task-result.component';
import { CandidateListComponent } from './components/user-management/candidates-list/candidate-list.component';
import { CandidateResultComponent } from './components/exercise-executor/candidate-result/candidate-result.component';
import { TestInfoComponent } from './components/exercise-management/test-info/test-info.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  static backendUrl = environment.apiUrl;

  title = 'app';
  loading = true;

  constructor(private storageService: StorageService, public authService: AuthService, private router: Router) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  logOut(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    if (this.storageService.getToken()) {
      this.authService.loginUser(this.storageService.getUser());
    }

    this.authService.addRoleComponent(this.authService.candidate, ExerciseListComponent.name);
    this.authService.addRoleComponent(this.authService.candidate, TaskValidationComponent.name);
    this.authService.addRoleComponent(this.authService.candidate, ViewResultComponent.name);

    this.authService.addRoleComponent(this.authService.admin, UserListComponent.name);
    this.authService.addRoleComponent(this.authService.admin, InvitesSenderComponent.name);
    this.authService.addRoleComponent(this.authService.admin, UserInfoComponent.name);

    this.authService.addRoleComponent(this.authService.manager, CandidateListComponent.name);
    this.authService.addRoleComponent(this.authService.manager, CandidateResultComponent.name);
    this.authService.addRoleComponent(this.authService.manager, ViewResultComponent.name);

    this.authService.addRoleComponent(this.authService.coach, ExerciseManagementComponent.name);
    this.authService.addRoleComponent(this.authService.coach, TaskInfoComponent.name);
    this.authService.addRoleComponent(this.authService.coach, TestInfoComponent.name);
    this.authService.addRoleComponent(this.authService.coach, AssemblyManagementComponent.name);
  }
}

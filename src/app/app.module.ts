import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { EqualValidator } from '../app/components/security/sign-up/sign-up-validator.directive';
import { PasswordEqualValidator } from '../app/components/security/restore-password-recovery/password-recovery-validator.directive';
import { TaskValidationComponent } from './components/exercise-executor/task-validation/task-validation.component';
import { ExerciseListComponent } from './components/exercise-executor/exercises/exercises.component';
import { RegisterComponent } from './components/security/sign-up/sign-up.component';
import { InvitesSenderComponent } from './components/user-management/invites-sending/invites-sending.component';
import { AppRoutingModule } from './/app-routing.module';
import { WelcomeComponent } from './components/notifications/welcome-notification/welcome-notification.component';
import { UserInfoComponent } from './components/user-management/user-info/user-info.component';
import { UserListComponent } from './components/user-management/accounts/accounts.component';
import { LoginComponent } from './components/security/sign-in/sign-in.component';
import { PasswordRecoveryComponent } from './components/security/restore-password-recovery/password-recovery.component';
import { RegisterNotificationComponent } from './components/notifications/confirm-registration/confirm-registration.component';
import { RestorePasswordEnterEmailComponent } from './components/security/restore-password-enter-email/restore-password-enter-email.component';
import { RestorePasswordNotificationComponent } from './components/notifications/password-changed/restore-password-notification.component';
import { RestorePasswordSendSuccessComponent } from './components/notifications/email-sent/email-sent-notification.component';
import { ConfirmEmailNotificationComponent } from './components/notifications/email-confirmed/confirm-email-notification.component';
import { AssemblyManagementComponent } from './components/exercise-management/assembly-management/assembly-management.component';
import { ViewResultComponent } from './components/exercise-executor/task-result/task-result.component';
import { ExerciseManagementComponent } from './components/exercise-management/exercise-management/exercise-management.component';
import { TaskInfoComponent } from './components/exercise-management/task-info/task-info.component';
import { DeniedComponent } from './components/notifications/denied/denied-notification.component';
import { InvitesNotificationComponent } from './components/notifications/invites-notifications/invites-notification.component';
import { InvitesSenderService } from './services/user-management/invites-sending.service';
import { ExerciseListService } from './services/exercise-executor/exercise-list.service';
import { ExerciseManagementService } from './services/exercise-management/exercise-management.service';
import { ExerciseExecutorService } from './services/exercise-executor/exercise-executor.service';
import { AccountService } from './services/security/account.service';
import { CandidateListService } from './services/exercise-executor/candidate-list.service';
import { ProfileService } from './services/user-management/profile.service';
import { AssemblyInfoService } from './services/exercise-executor/assembly-info.service';
import { StorageService } from './services/security/storage.service';
import { AuthService } from './services/security/auth.service';
import { PagerService } from './services/user-management/pager.service';
import { InvitesService } from './services/user-management/invites.service';
import { AssemblyInfoViewComponent } from './components/exercise-management/assembly-info/assembly-info.component';
import { AccountInfoComponent } from './components/user-management/account-info/account-info.component';
import { CandidateListComponent } from './components/user-management/candidates-list/candidate-list.component';
import { TimerComponent } from './components//exercise-executor/timer/timer.component';
import { CandidateResultComponent } from './components/exercise-executor/candidate-result/candidate-result.component';
import { ExerciseResultService } from './services/exercise-executor/exercise-result.service';
import { HighlightModule } from 'ngx-highlightjs';
import { TestInfoComponent } from './components/exercise-management/test-info/test-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ExerciseListComponent,
    RegisterComponent,
    EqualValidator,
    PasswordEqualValidator,
    InvitesSenderComponent,
    WelcomeComponent,
    UserInfoComponent,
    UserListComponent,
    LoginComponent,
    ExerciseManagementComponent,
    TaskInfoComponent,
    PasswordRecoveryComponent,
    RegisterNotificationComponent,
    RestorePasswordEnterEmailComponent,
    RestorePasswordNotificationComponent,
    RestorePasswordSendSuccessComponent,
    ConfirmEmailNotificationComponent,
    AssemblyManagementComponent,
    ViewResultComponent,
    TaskValidationComponent,
    DeniedComponent,
    InvitesNotificationComponent,
    AssemblyInfoViewComponent,
    AccountInfoComponent,
    CandidateListComponent,
    TimerComponent,
    CandidateResultComponent,
    TestInfoComponent,
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      FormsModule,
      HighlightModule.forRoot({ theme: 'vs'})
  ],
  providers: [
    ExerciseListService,
    HttpClient,
    AccountService,
    CandidateListService,
    ProfileService,
    ExerciseExecutorService,
    AssemblyInfoService,
    StorageService,
    ExerciseManagementService,
    AuthService,
    InvitesService,
    PagerService,
    ExerciseResultService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { InvitesSenderComponent } from './components/user-management/invites-sending/invites-sending.component';
import { ExerciseListComponent } from './components/exercise-executor/exercises/exercises.component';
import { UserListComponent } from './components/user-management/accounts/accounts.component';
import { UserInfoComponent } from './components/user-management/user-info/user-info.component';
import { ViewResultComponent } from './components/exercise-executor/task-result/task-result.component';
import { TaskValidationComponent } from './components/exercise-executor/task-validation/task-validation.component';
import { ExerciseManagementComponent } from './components/exercise-management/exercise-management/exercise-management.component';
import { TaskInfoComponent } from './components/exercise-management/task-info/task-info.component';
import { WelcomeComponent } from './components/notifications/welcome-notification/welcome-notification.component';
import { RegisterComponent } from './components/security/sign-up/sign-up.component';
import { PasswordRecoveryComponent } from './components/security/restore-password-recovery/password-recovery.component';
import { RegisterNotificationComponent } from './components/notifications/confirm-registration/confirm-registration.component';
import { RestorePasswordEnterEmailComponent } from './components/security/restore-password-enter-email/restore-password-enter-email.component';
import { RestorePasswordNotificationComponent } from './components/notifications/password-changed/restore-password-notification.component';
import { RestorePasswordSendSuccessComponent } from './components/notifications/email-sent/email-sent-notification.component';
import { ConfirmEmailNotificationComponent } from './components/notifications/email-confirmed/confirm-email-notification.component';
import { AssemblyManagementComponent } from './components/exercise-management/assembly-management/assembly-management.component';
import { AssemblyInfoViewComponent } from './components/exercise-management/assembly-info/assembly-info.component';
import { DeniedComponent } from './components/notifications/denied/denied-notification.component';
import { InvitesNotificationComponent } from './components/notifications/invites-notifications/invites-notification.component';
import { AccountInfoComponent } from './components/user-management/account-info/account-info.component';
import { CandidateListComponent } from './components/user-management/candidates-list/candidate-list.component';
import { CandidateResultComponent } from './components/exercise-executor/candidate-result/candidate-result.component';
import { LoginComponent } from './components/security/sign-in/sign-in.component';
import { TestInfoComponent } from './components/exercise-management/test-info/test-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'invites/send', component: InvitesSenderComponent },
  { path: 'invites/notifications/:result', component: InvitesNotificationComponent },
  { path: 'exercises', component: ExerciseListComponent },
  { path: 'exercises/:id', component: TaskValidationComponent },
  { path: 'exercises/results/:candidateId', component: CandidateResultComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'accounts', component: UserListComponent },
  { path: 'denied', component: DeniedComponent },
  { path: 'accounts/:id', component: UserInfoComponent },
  { path: 'accountInfo', component: AccountInfoComponent },
  { path: 'signIn', component: LoginComponent },
  { path: 'signUp', component: RegisterComponent },
  { path: 'exerciseManagement', component: ExerciseManagementComponent },
  { path: 'exerciseManagement/createTask', component: TaskInfoComponent },
  { path: 'exerciseManagement/createTest', component: TestInfoComponent },
  { path: 'exerciseManagement/editTask/:id', component: TaskInfoComponent },
  { path: 'exerciseManagement/editTest/:id', component: TestInfoComponent },
  { path: 'restorePassword/enterEmail', component: RestorePasswordEnterEmailComponent },
  { path: 'restorePassword/enterNew', component: PasswordRecoveryComponent },
  { path: 'restorePassword/emailSent', component: RestorePasswordSendSuccessComponent },
  { path: 'restorePassword/passwordChanged', component: RestorePasswordNotificationComponent },
  { path: 'successfulRegistration', component: RegisterNotificationComponent },
  { path: 'confirmEmail', component: ConfirmEmailNotificationComponent },
  { path: 'taskResults/:id', component: ViewResultComponent },
  { path: 'taskResults/:id/:userId', component: ViewResultComponent },
  { path: 'assemblyManagement', component: AssemblyManagementComponent },
  { path: 'assembly/:id', component: AssemblyInfoViewComponent },
  { path: 'candidatesList', component: CandidateListComponent },
  { path: 'testInfo', component: TestInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

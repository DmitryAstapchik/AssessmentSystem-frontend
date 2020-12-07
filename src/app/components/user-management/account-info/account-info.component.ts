import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/security/auth.service';
import { IUser } from '../../../models/security/user';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  currentUser: IUser;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
  }
}

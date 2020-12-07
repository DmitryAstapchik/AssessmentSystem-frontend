import { Component, OnInit } from '@angular/core';
import { Account } from '../../../models/user-management/account';
import { AccountService } from '../../../services/security/account.service';
import { AuthService } from '../../../services/security/auth.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { PagerService } from '../../../services/user-management/pager.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})

export class UserListComponent implements OnInit {
  page: number;
  amountOnPage: number;
  allAccountsCount: number;
  pager: any = {};
  pagedItems: Account[];
  searchingEmail: string = null;
  isChanging: boolean;
  selectedRole: string;
  order = 'email';
  reverse = false;
  options = ['all', 'candidate', 'admin', 'coach', 'manager'];

  constructor(private accountService: AccountService,
    private authService: AuthService,
    private router: Router,
    private pagerService: PagerService) { }

  ngOnInit() {
    if (!this.authService.checkAccess(UserListComponent.name)) {
      this.router.navigate(['denied']);
    }

    this.page = 1;
    this.amountOnPage = 25;
    this.selectedRole = this.options[0];
    this.loadAccountsCount(this.selectedRole, this.searchingEmail)
      .add(() => this.setPage(1));
  }

  onChange(newValue) {
    this.selectedRole = newValue;
    this.loadAccountsCount(this.selectedRole, this.searchingEmail)
      .add(() => this.setPage(1));
  }

  setPage(page: number) {

    if (page > this.pager.totalPages) {
      page = this.pager.totalPages;
    }
    else if (page < 1) {
      page = 1;
    }
    else {
      this.page = page;
    }

    this.pager = this.pagerService.getPager(this.allAccountsCount, page, this.amountOnPage);
    this.loadAccounts(
      this.pager.currentPage,
      this.pager.pageSize,
      this.selectedRole,
      this.searchingEmail,
      this.order,
      this.reverse);
  }

  changeActive(index: number) {
    const value = this.pagedItems[index].isActive;
    this.isChanging = true;
    this.accountService.changeIsActive(this.pagedItems[index].id)
      .subscribe(() => {
        this.pagedItems[index].isActive = !value;
        this.isChanging = false;
      });
  }

  isAdmin(index: number) {
    return this.pagedItems[index].roles.includes('admin');
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
    this.loadAccounts(
      this.pager.currentPage,
      this.pager.pageSize,
      this.selectedRole,
      this.searchingEmail,
      this.order,
      this.reverse);
  }

  confirmEmailByAdmin(index: number) {
    const value = this.pagedItems[index].isEmailConfirmed;
    this.isChanging = true;
    this.accountService.confirmEmailByAdmin(this.pagedItems[index].id)
      .subscribe(() => {
        this.pagedItems[index].isEmailConfirmed = !value;
        this.isChanging = false;
      });
  }

  onSelectAmount = (e) => {
    this.amountOnPage = e.target.value;
    this.setPage(this.page);
  }

  public startSearch(value: string) {
    this.searchingEmail = value;
    this.loadAccountsCount(this.selectedRole, this.searchingEmail)
      .add(() => this.setPage(1));
  }

  private loadAccounts(page, amount, roleName, emailPart, order, reverse) {
    this.accountService.getAccounts(page, amount, roleName, emailPart, order, reverse)
      .subscribe(accounts => {
        this.pagedItems = accounts;
      });
  }

  private loadAccountsCount(roleName, emailPart) {
    return this.accountService.getAccountsCount(roleName, emailPart)
      .subscribe(count => {
        this.allAccountsCount = count;
      });
  }
}

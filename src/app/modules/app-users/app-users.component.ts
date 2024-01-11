import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTable } from '../../basics/app-table/app-table.component';

import { UsersService } from '../../services/users-service.service';
import { AppSpinner } from '../../basics/app-spinner/app-spinner.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-test-button',
  standalone: true,
  template: `<button (click)="handlers.handleDeleteUser($event)">X</button>`,
  styleUrl: './app-users.component.css'
})
export class TestButton {
  constructor(public usersService: UsersService) {
  }
  @Input() handlers: any;
}

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form
    id='app-form'
    (ngSubmit)="onSubmitAddUser($event)"
    class='app-form'
    >
      <label for='firstName'>First Name:</label>
      <input type='text' id='firstName' name='firstName' required/>
      <label for='lastName'>Last Name:</label>
      <input type='text' id='lastName' name='lastName' required/>
      <label for='email'>Email:</label>
      <input type='text' id='email' name='email' required/>
      <input type='submit' value='Submit' wrap='hard' />
    </form>
  `,
  styleUrl: './app-users.component.css'
})
export class UserForm {
  constructor(public usersService: UsersService) {

  }

  onSubmitAddUser(event: any) {
    const element: any = document.getElementById('app-form');
    const data: any = new FormData(element);
    const userData: any = {}

    for (let i of data) {
      userData[i[0]] = i[1];
    }

    console.log('user data: ', userData);

    this.usersService.createUser(userData);
  }
}

@Component({
  selector: 'add-user-dialog',
  standalone: true,
  imports: [CommonModule, AppSpinner, UserForm],
  template: `
    
      <dialog id="create-user-dialog" className="create-user-dialog" open>
        <app-spinner *ngIf="usersService.creatingUser"></app-spinner>
        <user-form *ngIf="!usersService.creatingUser"></user-form>
      </dialog>
    
    `,
  styleUrl: './app-users.component.css'
})
export class AddUserDialog {
  @Input() addUserDialogOpen: any = false;
  @Input() creatingUser: any = false;

  constructor(public usersService: UsersService) {

  }
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, AppTable, AppSpinner, AddUserDialog],
  templateUrl: './app-users.component.html',
  styleUrl: './app-users.component.css'
})
export class AppUsers {
  constructor(public usersService: UsersService) {

  }

  usersData = null;
  fetchingUsersData = false;
  addUserDialogOpen = false;
  creatingUser = false;
  deletingUser = false;
  userError = false;

  handleOpenAddUserDialog(event: any) {
    console.log(event)
    this.addUserDialogOpen = true;
    // this.ref.detectChanges();
  }

  ngOnInit() {
    this.usersService.fetchAllUsers();
  }
}
import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppTable } from '../../basics/app-table/app-table.component';
import { of, from, Subscription } from 'rxjs';

import { UsersService } from '../../services/users-service.service';
import { AppSpinner } from '../../basics/app-spinner/app-spinner.component';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


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
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form
    id="app-form"
    [formGroup]="userForm"
    (ngSubmit)="$event.preventDefault(); handleAddUser($event)"
    class="app-form"
    >
      <label>First Name:</label>
      <input
        type="text"
        id="firstName"
        formControlName="firstName"
      />
      <label>Last Name:</label>
      <input
        type="text"
        id="lastName"
        formControlName="lastName"
      />
      <label>Email:</label>
      <input
        type="text"
        id="email"
        formControlName="email"
      />
      <input
        type="submit"
        value="Submit"
        wrap="hard"
      />
    </form>
  `,
  styleUrl: './app-users.component.css'
})
export class UserForm {
  constructor(public usersService: UsersService) {

  }

  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })

  handleAddUser(event: any) {
    this.usersService.createUser(this.userForm.value);
  }
}

@Component({
  selector: 'add-user-dialog',
  standalone: true,
  imports: [CommonModule, AppSpinner, UserForm],
  template: `
    
      <dialog id="create-user-dialog" className="create-user-dialog" [attr.open]="addUserDialogOpen ? true : null">
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
  usersTableData = null;
  fetchingUsersData = false;
  addUserDialogOpen = false;
  creatingUser = false;
  deletingUser = false;
  userError = false;

  handleOpenAddUserDialog(event: any) {
    this.addUserDialogOpen = true;
  }

  ngOnInit() {
    this.usersService.fetchAllUsersRequest();
    this.usersService.allUsersData$.subscribe((users: any) => {
      if (!(users.length > 0)) return;
      console.log('usres in observer', users)
      this.usersTableData = users.map((user: any) => {
            
            const userRecord: any = Object.entries(user).map((userEntry: any) => {
              return {
                columnName: userEntry[0],
                value: userEntry[1],
                isElement: false,
              }
            });
    
            userRecord.push({
              handlers: {
                handleDeleteUser: () => {this.usersService.deleteUser(user.id)},
              },          
              columnName: '',
              value: TestButton,
              isElement: true,
            });
    
            return userRecord;
          });
    })
  }
}
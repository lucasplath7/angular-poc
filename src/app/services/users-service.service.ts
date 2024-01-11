import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TestButton } from "../modules/app-users/app-users.component";

const API_BASE_URL = 'http://localhost:3001/api'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  creatingUser = false;
  deletingUser = false;
  fetchingUsersData = false;
  allUsersData: any = null;

  constructor(private http: HttpClient) {

  }

  fetchAllUsers() {
    this.fetchingUsersData = true;
    this.fetchAllUsersRequest().subscribe((users: any) => {
      console.log('user service resp: ', users)
      this.allUsersData = users.map((user: any) => {
        const userRecord: any = Object.entries(user).map((userEntry: any) => {
          return {
            columnName: userEntry[0],
            value: userEntry[1],
            isElement: false,
          }
        });

        userRecord.push({
          handlers: {
            handleDeleteUser: () => {this.deleteUser(user.id)},
          },          
          columnName: '',
          value: TestButton,
          isElement: true,
        });

        return userRecord;
      });

      this.fetchingUsersData = false
    })
  }

  fetchAllUsersRequest() {
    return this.http.get(`${API_BASE_URL}/user`)
  }

  createUser(userData: any) {
    this.creatingUser = true;
    this.createUserRequest(userData).subscribe(resp => {
      console.log('resp in create: ', resp)
      this.creatingUser = false;
      this.fetchAllUsers();
    },
    err => { console.log('error: ', err)}
    )
  }

  createUserRequest(userData: any) {
    return this.http.post(`${API_BASE_URL}/user`, userData, {observe: 'response', responseType: 'text'});
  }

  deleteUser(userId: any) {
    this.deletingUser = true;
    this.deleteUserRequest(userId).subscribe(resp => {
      this.deletingUser = false;
      this.fetchAllUsers();
    })
  }

  deleteUserRequest(userId: any) {
    return this.http.delete(`${API_BASE_URL}/user/${userId}`, {observe: 'response', responseType: 'text'});
  }
}
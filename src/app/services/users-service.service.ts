import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, tap } from "rxjs";

const API_BASE_URL = 'http://localhost:3001/api'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  creatingUser = false;
  deletingUser = false;
  fetchingUsersData = false;
  private allUsersData = new BehaviorSubject<any>([]);
  allUsersData$ = this.allUsersData.asObservable();

  constructor(private http: HttpClient) {

  }

  fetchAllUsersRequest() {
    this.fetchingUsersData = true;

    this.http.get(`${API_BASE_URL}/user`).subscribe((users: any) => {
        this.allUsersData.next(users);
        this.fetchingUsersData = false;
      });
  }

  createUser(userData: any) {
    this.creatingUser = true;
    
    this.createUserRequest(userData).subscribe(resp => {
      const newUser = {
        id: resp.body,
        ...userData,
      };
      
      this.allUsersData.next(
        [...this.allUsersData.value, newUser]
      );

      this.creatingUser = false;
    },
    err => { console.log('error: ', err)}
    )
  }

  createUserRequest(userData: any) {
    return this.http.post(`${API_BASE_URL}/user`, userData, {observe: 'response', responseType: 'text'});
  }

  deleteUser(userId: any) {
    const url = `${API_BASE_URL}/user/${userId}`;

    this.deletingUser = true;
    this.http.delete(url, { observe: 'response', responseType: 'text' }).subscribe(resp => {
      this.allUsersData.next(this.allUsersData.value.filter((user: any) => user.id !== userId));
      this.deletingUser = false;
    })
  }
}
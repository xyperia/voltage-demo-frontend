import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UsersModel } from '../models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<UsersModel>;
    public user: Observable<UsersModel>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<UsersModel>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): UsersModel {
        return this.userSubject.value;
    }

    login(USERNAME, PASSWORD) {
        return this.http.post<UsersModel>(`${environment.apiUrl}/auth`, { USERNAME, PASSWORD })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                console.log(user);
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: UsersModel) {
        return this.http.post(`${environment.apiUrl}/users`, user);
    }

    getAll() {
        return this.http.get<UsersModel[]>(`${environment.apiUrl}/users/getall`);
    }

    getById(id: string) {
        return this.http.get<UsersModel>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.ID) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(ID: string) {
        // return this.http.delete(`${environment.apiUrl}/users/delete/${ID}`)
        //     .pipe(map(x => {
        //         // auto logout if the logged in user deleted their own record
        //         if (ID == this.userValue.ID) {
        //             this.logout();
        //         }
        //         return x;
        //     }));
        return this.http.get<UsersModel>(`${environment.apiUrl}/users/delete/${ID}`);
    }
}
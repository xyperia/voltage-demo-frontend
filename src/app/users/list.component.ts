﻿import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '../services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(ID: string) {
        const user = this.users.find(x => x.ID === ID);
        user.isDeleting = true;
        this.accountService.delete(ID)
            .pipe(first())
            .subscribe(() => {
                this.users = this.users.filter(x => x.ID !== ID) 
            });
    }
}
import { Component, Inject, OnInit } from '@angular/core';
import { first } from 'rxjs/operators'
import {MatTableDataSource} from '@angular/material/table';
import { AccountService } from '../services';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
  

@Component({ templateUrl: 'list.component.html', styleUrls: ['list.component.scss'], })
export class ListComponent implements OnInit {

    constructor(private accountService: AccountService, public dialog: MatDialog) {}

    
    displayedColumns: string[] = ['ID', 'USERNAME', 'PASSWORD', 'TOKEN'];
    users = new MatTableDataSource([]);
    clickedID;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users.data = users);
    }

    openDialog(data: any) {
        this.dialog.open(ListDetailDialog, {
          data: {
            form: data,
          },
        });
      }
}

@Component({
    selector: 'list-detail',
    templateUrl: 'list-detail.component.html',
  })

  export class ListDetailDialog {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data, 
        private accountService: AccountService,
        private router: Router
        ) {}

    deleteUser(ID: string) {
        this.accountService.delete(ID).pipe(first()).subscribe(x => {
            this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/users']);
            });
        });
    }
  }
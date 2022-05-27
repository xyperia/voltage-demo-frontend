import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  belum: string = null;
  sudah: string = null;

  constructor(
    private service:DashboardService
  ) {  }
  
  public logout(): void {
    // todo
  }

  encrypt(){
    this.subs.add(this.service.encrypt(this.belum).subscribe(x => console.log(x)));
  }

  ngOnInit(): void{
  }

  ngOnDestroy(): void{
    this.subs.unsubscribe();
  }
}
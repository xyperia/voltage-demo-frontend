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

  constructor(
    private service:DashboardService
  ) {  }

  ngOnInit(): void{
  }

  ngOnDestroy(): void{
    this.subs.unsubscribe();
  }
}
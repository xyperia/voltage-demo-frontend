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
  enPlain: string = null;
  enCipher: string = null;

  dePlain: string = null;
  deCipher: string = null;

  constructor(
    private service:DashboardService
  ) {  }
  
  public logout(): void {
    // todo
  }

  encrypt(){
    let data = {
      "fields": [
      {
        "fieldName" : "encrypt",
        "format" : "AlphaNumeric",
        "data" : [
          this.enPlain
        ]
      }
    ]};

    this.subs.add(this.service.crypt(data, true).subscribe(x => this.enCipher = x.fields[0].data));
  }

  decrypt(){
    let data = {
      "fields": [
      {
        "fieldName" : "decrypt",
        "format" : "AlphaNumeric",
        "data" : [
          this.dePlain
        ]
      }
    ]};

    this.subs.add(this.service.crypt(data, false).subscribe(x => this.deCipher = x.fields[0].data));
  }

  ngOnInit(): void{
  }

  ngOnDestroy(): void{
    this.subs.unsubscribe();
  }
}
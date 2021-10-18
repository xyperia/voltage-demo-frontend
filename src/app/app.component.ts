import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { SubSink } from 'subsink';
import { User } from './models';
import { AccountService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  private subs: SubSink;
  user: User;
  getTitle: string = environment.appTitle;
  pageTitle: string;

  public constructor(
      private titleService: Title,
      private router: Router,
      location: Location,
      private accountService: AccountService) {
            this.titleService.setTitle(this.getTitle);
            router.events.subscribe((val) => {
            this.pageTitle = this.urlExtract(location.path());
            this.accountService.user.subscribe(x => this.user = x);
        });
  }

  logout() {
    this.accountService.logout();
  }

  private urlExtract(url: string){
    return url.split('/').join(' ').slice(1).replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
  }
}
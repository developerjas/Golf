import { Component, OnInit, OnDestroy} from '@angular/core';
import { User } from './Shared/_models';
import { UserService } from './Shared/_services';
import * as XLSX from 'xlsx';
import { Subscription } from 'rxjs';
import { OrderModel } from './Shared/_services/order.model';

const { read, write, utils } = XLSX;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Golf';
  public orders: OrderModel[];
  currentUser: User;
  isAuthencation = false;
  private userSub: Subscription;

  constructor(
    private userService: UserService,
  )
  { } 


  ngOnInit() {
    this.userService.autoLogin();
    this.userSub = this.userService.user.subscribe(user => {
      this.isAuthencation = !!user;
    });
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
 
}

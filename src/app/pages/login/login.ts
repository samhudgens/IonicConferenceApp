import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { User } from '../../models';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit {
  submitted = false;
  username: '';
  password: '';
  users: User[];

  constructor(
    public userProvider: UserData,
    public router: Router
  ) { }

  ngOnInit() {
    this.userProvider.getUsers()
    .subscribe((data: User[]) => { this.users = data; });
  }

  onLogin(form: NgForm) {
    if (form.valid) {
      const user = this.findUser(this.username.toLowerCase().trim());
      if (user) {
        if (user.password === this.password) {
          this.userProvider.login(user);
          this.router.navigateByUrl('/app/tabs/(schedule:schedule)');
        } else {
          alert('Invalid password.');
        }
      } else {
        alert('User not found');
      }
    }
  }

  findUser(data: string) {
    if (data.indexOf('@') > -1) {
      return this.users.find(user => user.email.toLowerCase() === data);
    }
    return this.users.find(user => user.username.toLowerCase() === data);
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}

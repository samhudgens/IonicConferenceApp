import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { User } from '../../models';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit {
  login = { username: '', password: '' };
  submitted = false;
  users: User[];

  constructor(
    public userData: UserData,
    public router: Router
  ) { }

  ngOnInit() {
    this.userData.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      }
    );
  }

  onLogin(form: NgForm) {
    this.submitted = true;
    console.log(this.users);
    const user = this.users.find(user => user.username === form.value.username);
    console.log(form.value);
    console.log(form.value.username);
    console.log(user);
    if (form.valid
      && user
      ) {
      if (user.password === this.login.password) {
        this.userData.login(this.login.username);
        this.router.navigateByUrl('/app/tabs/(schedule:schedule)');
      } else {
        alert("Invalid password");
      }
    } else {
      alert("Username not found");
    }
  }

  userNameExists(username: string) {
    return this.users.find(user => user.username === username);
  }

  passWordMatches(user: User, password: string) {
    return 
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}

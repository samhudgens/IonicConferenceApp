import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

// import { UserOptions } from '../../interfaces/user-options';
import { User, IdName } from '../../models';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupPage implements OnInit {
  signup: User = {
    username: '',
    password: '',
    email: '',
    favorites: []
  };
  confirmPassword = '';
  submitted = false;
  users: User[];

  constructor(
    public router: Router,
    public userData: UserData
  ) { }

  ngOnInit() {
    this.userData.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      }
    );
  }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid
      && this.userNameExists(form.value.username) === false
      && !this.userEmailExists(form.value.email)) {
      this.userData.signup(form.value);
      this.router.navigateByUrl('/app/tabs/(schedule:schedule)');
    }
  }

  userNameExists(username: string) {
    if (this.users.find(user => user.username === username)) {
      return true;
    } else {
      return false;
    }
  }

  userEmailExists(email: string) {
    return this.users.find(user => user.email === email);
  }

}

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
    public userProvider: UserData
  ) { }

  ngOnInit() {
    this.userProvider.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      }
    );
  }

  onSignup(form: NgForm) {
    this.submitted = true;
    if (form.valid && this.signup.password === this.confirmPassword) {
      if (this.userNameExists(this.signup.username)) {
        alert('Username is already taken.');
      } else if (this.userEmailExists(this.signup.email)) {
        alert('Email is already taken.');
      } else {
        this.userProvider.signup(this.signup);
        this.router.navigateByUrl('/app/tabs/(schedule:schedule)');
      }
    }
  }

  userNameExists(username: string) {
    return (this.users.find(user => user.username.toLowerCase() === username.toLowerCase()));
  }

  userEmailExists(email: string) {
    return this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
  }

}

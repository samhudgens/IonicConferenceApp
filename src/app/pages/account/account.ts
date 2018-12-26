import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { UserData } from '../../providers/user-data';
import { User } from '../../models';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountPage implements AfterViewInit {
  id: string;
  users: User[];
  user: User;

  constructor(
    public alertCtrl: AlertController,
    public router: Router,
    public userProvider: UserData
  ) { }

  ngAfterViewInit() {
    this.userProvider.getUsers().subscribe((users) => {
      this.users = users;
      console.log(users);
      // console.log();
    });
    // this.userProvider.getUser().then((user) => {
    //   this.id = user.id;
    //   this.user = user;
    //   console.log(user.id);
    //   console.log('current user: ' + this.user.username);
    // });
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  async changeUsername() {
    const changeForm = await this.alertCtrl.create({
      header: 'Change Username',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            if (this.isTheValueUsed(data.username)) {
              alert(data.username + ' is already in use. Please choose another');
            } else {
              this.user.id = this.id;
              this.user.username = data.username;
              this.userProvider.updateUser(this.user);
              console.log(this.user);
            }
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'username',
          value: this.user.username,
          placeholder: 'new username'
        }
      ]
    });
    await changeForm.present();
  }

  isTheValueUsed(value: string) {
    if (value.indexOf('@') < 0) {
      return this.users.find(user => user.username.toLowerCase() === value.toLowerCase());
    }
    return this.users.find(user => user.email.toLowerCase() === value.toLowerCase());
  }

  logout() {
    this.userProvider.logout();
    this.router.navigateByUrl('/login');
  }

  support() {
    this.router.navigateByUrl('/support');
  }
}

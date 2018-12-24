import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserProvider {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  usersCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;

  constructor(
    private afs: AngularFirestore,
    public events: Events,
    public storage: Storage
  ) {
    this.usersCollection = this.afs.collection('usersSH', ref => ref.orderBy('username', 'asc'));
   }

   getUsers(): Observable<User[]> {
    this.users = this.usersCollection.snapshotChanges()
    .pipe(map(response => {
      return response.map(action => {
        const data = action.payload.doc.data() as User;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
    return this.users;
  }

  signup(user: User) {
    this.usersCollection.add(user)
    .then(res => {
      user.id = res.id;
      this.login(user);
    });
  }

  login(user: User): Promise<any> {
    return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
      this.setUser(user);
      return this.events.publish('user:login');
    });
  }

  logout(): Promise<any> {
    return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
      return this.storage.remove('username');
    }).then(() => {
      this.events.publish('user:logout');
    });
  }

  setUser(user: User): Promise<any> {
    return this.storage.set('user', user);
  }

  getUsername(): Promise<string> {
    return this.storage.get('user').then((value) => {
      return value;
    });
  }

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  }

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  }

  removeFavorite(sessionName: string): void {
    const index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  }
}

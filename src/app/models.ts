export interface Track {
  id?: string;
  name: string;
}

export interface Speaker {
  id?: string;
  name: string;
  profilePic?: string;
  twitter?: string;
  about?: string;
  location?: string;
  email: string;
  phone?: string;
  sessions?: IdName[];   // session id & name
}

export interface Session {
  id?: string;
  name: string;
  date: string;         // 2018-12-06
  timeStart: string;    // 15:30 for 3:30pm
  timeEnd?: string;
  location?: string;
  description?: string;
  speakerIDs: string[];   // speaker's id
  tracks: string[];     //  name of track
}

export interface IdName {
  id: string;
  name: string;
}

export interface Map {
  id?: string;
  name: string;
  lat: number;
  lng: number;
  center?: boolean;
}

export interface User {
  id?: string;
  username: string;
  password: string;
  email: string;
  favorites: IdName[];       // session's id and name.
}

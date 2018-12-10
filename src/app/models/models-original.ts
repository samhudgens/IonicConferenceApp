export interface Session {
  id: string;
  name: string;
  timeStart: string;
  timeEnd?: string;
  location?: string;
  description?: string;
  speakerNames: [Speaker];
  tracks: [string];
}

export interface EventGroup {
  time: string;
  sessions: [Session];
}

export interface Speaker {
  id: string;
  name: string;
  profilePic?: string;
  twitter?: string;
  about?: string;
  location?: string;
  email: string;
  phone?: string;
  sessions: [string];   // id of session
}

export interface Schedule {
  date: Date;
  groups: [EventGroup];
}

export interface Map {
  id: string;
  name: string;
  lat: number;
  lng: number;
  center?: boolean;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  favorites: [string];   // id of session
}

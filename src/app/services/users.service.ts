import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  protected userList: User[] = [
    {
      "id": 1,
      "name": "Dorota Sajdak",
      "email": "test@test.com",
      "createdAt": "2025-10-01T09:33:29.567Z",
      "todayMood": null
    }
  ]

  protected userId: number = this.userList[0].id;
  protected userMood: number | null = this.userList[0].todayMood;

  async saveUserMood(todayMood: number): Promise<boolean> {
    console.log(todayMood + ' mood saved, user= '+ this.userId + ' last mood='+this.userMood);
    this.userMood = todayMood;
    return true;
  }

  getUserMood() {
    return this.userMood;
  }
}

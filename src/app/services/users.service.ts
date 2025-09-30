import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() {

  }

  // protected userList: User[] = [
  //   {
  //     "id": 1,
  //     "name": "Dorota Sajdak",
  //     "email": "test@test.com",
  //     "createdAt": "2025-10-01T09:33:29.567Z",
  //     "todayMood": null
  //   }
  // ]

  // protected userId: number = this.userList[0].id;
  // protected userMood: number | null = this.userList[0].todayMood;

  async saveUserMood(mood: number): Promise<boolean> {
    const userId = environment.userId;
    try {
      const response = await fetch(`${environment.userUrl}/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({todayMood: mood})
      });
      if (!response.ok) {
        return false;
      }
        return true;
    } catch (_error) {
      return false;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    const userId = environment.userId;
    try {
      const response = await fetch(`${environment.userUrl}/${userId}`);
      if (!response.ok) {
        return null;
      }
      const user: User = await response.json();
      return user ?? null;
    } catch (_error) {
      return null;
    }
  }

  async getUserMood(): Promise<number | null> {
    const userId = environment.userId;
    try {
      const response = await fetch(`${environment.userUrl}/${userId}`);
      if (!response.ok) {
        return null;
      }
      const user: User = await response.json();
      return user.todayMood ?? null;
    } catch (_error) {
      return null;
    }
  }
}

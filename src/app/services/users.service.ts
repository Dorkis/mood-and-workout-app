import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  saveUserMood(mood: number): Observable<boolean> {
    const userId = environment.userId;
    return this.http.patch(`${environment.userUrl}/${userId}`, { todayMood: mood })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  getCurrentUser(): Observable<User | null> {
    const userId = environment.userId;
    return this.http.get<User>(`${environment.userUrl}/${userId}`)
      .pipe(
        map(user => user ?? null),
        catchError(() => of(null))
      );
  }

  getUserMood(): Observable<number | null> {
    const userId = environment.userId;
    return this.http.get<User>(`${environment.userUrl}/${userId}`)
      .pipe(
        map(user => user.todayMood ?? null),
        catchError(() => of(null))
      );
  }
}

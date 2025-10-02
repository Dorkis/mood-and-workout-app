import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Moodoptions } from '../models/moodoptions';
import { environment } from '../environments/environment';
import { Mood } from '../models/mood';

@Injectable({
  providedIn: 'root'
})
export class MoodsService {

  constructor(private http: HttpClient) { }

  getAllMoods(): Observable<Moodoptions[]> {
    return this.http.get<Moodoptions[]>(environment.moodoptionsUrl)
      .pipe(
        map(data => data ?? []),
        catchError(() => of([]))
      );
  }

getLastUserMood(userId: number): Observable<Mood[]> {
  return this.http.get<Mood[]>(`${environment.moodsUrl}?userId=${userId}`)
    .pipe(
      map(data => {
        if (!data || data.length === 0) return [];
        let latest = data[0];
        for (let i = 1; i < data.length; i++) {
          const currentDate = new Date(data[i].createdAt).getTime();
          const latestDate = new Date(latest.createdAt).getTime();
          if (currentDate > latestDate) {
            latest = data[i];
          }
        }
        let today = new Date().toISOString().split('T')[0];
        let selected = new Date(latest.createdAt).toISOString().split('T')[0];
        if(today!=selected) {
          return [];
        }
        return [latest];
      }),
      catchError(() => of([])) 
    );
}

  saveUserMood(mood: Mood): Observable<boolean> {
    return this.http
      .post(environment.moodsUrl, mood, {
        headers: { 'Content-Type': 'application/json' }
      })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

}

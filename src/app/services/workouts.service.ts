import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Workout } from '../models/workout';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {
  constructor(private http: HttpClient) { }

  getWorkoutByUserId(userId: number): Observable<Workout[]> {
    return this.http
      .get<Workout[]>(`${environment.workoutUrl}?user.id=${userId}`)
      .pipe(
        map(workouts => workouts ?? []),
        catchError(() => of([]))
      );
  }

  addWorkout(workout: Workout): Observable<boolean> {
    return this.http
      .post(environment.workoutUrl, workout, {
        headers: { 'Content-Type': 'application/json' }
      })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}

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
      .get<Workout[]>(`${environment.workoutUrl}?userId=${userId}`)
      .pipe(
        map(workouts => workouts ?? []),
        catchError(() => of([]))
      );
  }

  getWorkoutById(id: number): Observable<Workout | null> {
    return this.http.get<Workout>(`${environment.workoutUrl}/${id}`).pipe(
      catchError(() => of(null))
    );
  }

  addWorkout(workout: Workout): Observable<boolean> {
    let workoutChanged = {...workout, id: workout.id.toString()};
    return this.http.post(environment.workoutUrl, workoutChanged, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  updateWorkout(workout: Workout): Observable<boolean> {
    return this.http.put(`${environment.workoutUrl}/${workout.id}`, workout, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  deleteWorkout(id: number): Observable<boolean> {
    return this.http.delete(`${environment.workoutUrl}/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}

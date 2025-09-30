import { Injectable } from '@angular/core';
import { Workout } from '../models/workout';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  constructor() { }

  async getWorkoutByUserId(userId: number): Promise<Workout[]> {
    try {
      const response = await fetch(`${environment.workoutUrl}?user.id=${userId}`);
      if (!response.ok) {
        return [];
      }
      const workouts: Workout[] = await response.json();
      return workouts ?? [];
    } catch (_error) {
      return [];
    }
  }
  async addWorkout(workout: Workout): Promise<boolean> {
    try {
      const response = await fetch(environment.workoutUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workout)
      });
      return response.ok;
    } catch (_error) {
      return false;
    }
  }
}

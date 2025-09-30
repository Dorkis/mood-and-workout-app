import { Injectable } from '@angular/core';
import { Workout } from '../models/workout';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  constructor() { }

  async getWorkoutByUserId(userId: number): Promise<Workout[]> {
    const data = await fetch(environment.workoutUrl);
    const workouts = await data.json();
    if (workouts) {
      workouts.map((workout: Workout) => {
        return userId === workout.user.id;
      })
    }
    return []
  }
  async addWorkout(workout: Workout[]): Promise<boolean> {
    
    return true;
  }
}

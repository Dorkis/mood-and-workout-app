import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutsService } from '../../services/workouts.service';
import { ActivatedRoute } from '@angular/router';
import { Workout } from '../../models/workout';
import { Observable, BehaviorSubject, combineLatest, map, startWith } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  private workoutsService = inject(WorkoutsService);
  private route = inject(ActivatedRoute);

  userId: number = Number(this.route.snapshot.paramMap.get('id'));

  sortControl = new FormControl('');

  userWorkouts$: Observable<Workout[]> = this.workoutsService.getWorkoutByUserId(this.userId);

  categories$: Observable<string[]> = this.userWorkouts$.pipe(
    map(workouts => Array.from(new Set(workouts.map(w => w.category))))
  );

  sortedWorkouts$: Observable<Workout[]> = combineLatest([
    this.userWorkouts$,
    this.sortControl.valueChanges.pipe(startWith(''))
  ]).pipe(
    map(([workouts, selectedCategory]) => {
      if (!selectedCategory) return workouts;
      return [...workouts]
        .filter(w => w.category === selectedCategory)
        .sort((a, b) => a.category.localeCompare(b.category));
    })
  );

  trackByWorkout(index: number, workout: Workout): number {
    return workout.id;
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutsService } from '../../services/workouts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Workout } from '../../models/workout';
import { Observable, BehaviorSubject, combineLatest, map, startWith, switchMap } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutEditDialogComponent } from '../workout-edit-dialog/workout-edit-dialog.component';
import { UsersService } from '../../services/users.service';

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
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private userService = inject(UsersService);
  userId: number;

  constructor() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.findUserById(this.userId).subscribe({
      next: (data) => {
        if(data === null) {
          this.router.navigate(['/']);
        }
      }
    })
  }

  refresh$ = new BehaviorSubject<void>(undefined);

  sortControl = new FormControl('');

  userWorkouts$: Observable<Workout[]> = this.refresh$.pipe(
    switchMap(() => this.workoutsService.getWorkoutByUserId(this.userId))
  );

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

  workoutForm = new FormGroup({
    category: new FormControl('', Validators.required),
    duration: new FormControl(0, Validators.required),
    distance: new FormControl<number | null>(null),
  });

  deleteWorkout(id: number) {
    this.workoutsService.deleteWorkout(id).subscribe(success => {
      if (success) this.refresh$.next();
    });
  }

  updateWorkout(workout: Workout) {
    const dialogRef = this.dialog.open(WorkoutEditDialogComponent, {
      width: '400px',
      data: { ...workout }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workoutsService.updateWorkout(result).subscribe(success => {
          if (success) this.refresh$.next();
        });
      }
    });
  }

  trackByWorkout(index: number, workout: Workout): number {
    return workout.id;
  }
}

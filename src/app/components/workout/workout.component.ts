import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { WorkoutsService } from '../../services/workouts.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { User } from '../../models/user';
import { Workout } from '../../models/workout';

@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss']
})
export class WorkoutComponent {
  private userService = inject(UsersService);
  private workoutsService = inject(WorkoutsService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  userMood$: Observable<number | null> = this.userService.getUserMood();
  currentUser$: Observable<User | null> = this.userService.getCurrentUser();

  // Forms
  selectionForm: FormGroup = this.fb.group({
    activity: new FormControl<string | null>(null, { validators: [Validators.required] })
  });

  detailsForm: FormGroup = this.fb.group({
    time: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(1)] }),
    distance: new FormControl<number | null>(null)
  });

  lightActivities: string[] = ['sleep', 'walk'];
  intenseActivities: string[] = ['run', 'bike', 'swim', 'stretching'];

  constructor() {
    // Dynamic distance validators
    this.selectionForm.get('activity')?.valueChanges.subscribe(activity => {
      const distanceControl = this.detailsForm.get('distance');
      if (!distanceControl) return;
      if (activity && ['run', 'bike', 'swim', 'walk'].includes(activity)) {
        distanceControl.setValidators([Validators.required, Validators.min(0.1)]);
      } else {
        distanceControl.clearValidators();
        distanceControl.setValue(null);
      }
      distanceControl.updateValueAndValidity({ emitEvent: false });
    });
  }

  get showLightSelector(): Observable<boolean> {
    return this.userMood$.pipe(
      map(mood => mood === null || mood === undefined ? true : mood <= 6)
    );
  }

  get selectedActivity(): string | null {
    return this.selectionForm.get('activity')?.value ?? null;
  }

  get shouldShowDistance(): boolean {
    const activity = this.selectedActivity;
    if (!activity) return false;
    return ['run', 'bike', 'swim', 'walk'].includes(activity);
  }

  onSubmitDetails(): void {
    if (!this.selectionForm.valid || !this.detailsForm.valid) {
      this.selectionForm.markAllAsTouched();
      this.detailsForm.markAllAsTouched();
      return;
    }

    this.currentUser$.pipe(
      switchMap(user => {
        if (!user) return of(false);

        const payload: Workout = {
          id: Math.floor(Math.random() * 1000000) + 1,
          user: user,
          category: this.selectedActivity as string,
          duration: this.detailsForm.get('time')?.value as number,
          distance: this.detailsForm.get('distance')?.value ?? null,
          createdAt: new Date()
        };

        return this.workoutsService.addWorkout(payload);
      })
    ).subscribe(success => {
      if (success) {
        this.currentUser$.subscribe(user => {
          if(user) this.router.navigate(['/user/', user.id]);
        });
      }
    });
  }
}

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
import { MoodsService } from '../../services/moods.service';
import { environment } from '../../environments/environment';
import { Mood } from '../../models/mood';

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
  private moodService = inject(MoodsService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  userId: number = environment.userId;
  errorMessage: string | null = null;

  userMood$: Observable<Mood[]> = this.moodService.getLastUserMood(this.userId);
  currentUser$: Observable<User | null> = this.userService.getCurrentUser();

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

  showLightSelector$: Observable<boolean> = this.userMood$.pipe(
    map(mood => {
      return mood[0] === null || mood[0] === undefined ? true : mood[0].moodId >= 3
    }
    )
  );

  get selectedActivity(): string | null {
    return this.selectionForm.get('activity')?.value ?? null;
  }

  get shouldShowDistance(): boolean {
    const activity = this.selectedActivity;
    if (!activity) return false;
    return ['run', 'bike', 'swim', 'walk'].includes(activity);
  }

  onSubmitDetails(): void {
    this.errorMessage = null;
    if (!this.selectionForm.valid || !this.detailsForm.valid) {
      this.selectionForm.markAllAsTouched();
      this.detailsForm.markAllAsTouched();
      this.errorMessage = "Fill in all fields";
      return;
    }

    this.currentUser$.pipe(
      switchMap(user => {
        if (!user) return of(false);

        const payload: Workout = {
          id: Math.floor(Math.random() * 1000000) + 1,
          userId: user.id,
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
          if (user) this.router.navigate(['/user/', user.id]);
        });
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-workout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.scss'
})
export class WorkoutComponent {
  user: UsersService = inject(UsersService);
  userMood = this.user.getUserMood();
  private formBuilder: FormBuilder = inject(FormBuilder);

  // Forms
  selectionForm: FormGroup = this.formBuilder.group({
    activity: new FormControl<string | null>(null, { nonNullable: false, validators: [Validators.required] })
  });

  detailsForm: FormGroup = this.formBuilder.group({
    time: new FormControl<number | null>(null, { nonNullable: false, validators: [Validators.required, Validators.min(1)] }),
    distance: new FormControl<number | null>(null)
  });

  // Activity sets
  lightActivities: string[] = ['sleep', 'walk'];
  intenseActivities: string[] = ['run', 'bike', 'swim', 'stretch'];

  // UI state
  get showLightSelector(): boolean {
    // Lower mood -> suggest lighter activities
    if (this.userMood === null || this.userMood === undefined) return true;
    return this.userMood <= 6;
  }

  get selectedActivity(): string | null {
    return this.selectionForm.get('activity')?.value ?? null;
  }

  get shouldShowDistance(): boolean {
    const activity = this.selectedActivity;
    if (!activity) return false;
    return ['run', 'bike', 'swim', 'walk'].includes(activity);
  }

  onActivityChange(): void {
    const activity = this.selectedActivity;
    // Toggle distance validator depending on activity
    const distanceControl = this.detailsForm.get('distance');
    if (!distanceControl) return;
    if (activity && ['run', 'bike', 'swim', 'walk'].includes(activity)) {
      distanceControl.addValidators([Validators.required, Validators.min(0.1)]);
    } else {
      distanceControl.clearValidators();
      distanceControl.setValue(null);
    }
    distanceControl.updateValueAndValidity({ emitEvent: false });
  }

  onSubmitDetails(): void {
    if (!this.selectionForm.valid || !this.detailsForm.valid) {
      this.selectionForm.markAllAsTouched();
      this.detailsForm.markAllAsTouched();
      return;
    }
    const payload = {
      mood: this.userMood,
      activity: this.selectedActivity,
      time: this.detailsForm.get('time')?.value,
      distance: this.detailsForm.get('distance')?.value ?? null,
    };
    console.log('Workout submission:', payload);
  }

  constructor() {
    console.log(this.userMood);
  }
}

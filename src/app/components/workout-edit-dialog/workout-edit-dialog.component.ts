import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Workout } from '../../models/workout';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-workout-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './workout-edit-dialog.component.html',
  styleUrls: ['./workout-edit-dialog.component.scss']
})
export class WorkoutEditDialogComponent {
  form: FormGroup;
  hideDistance: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WorkoutEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public workout: Workout
  ) {
    this.form = this.fb.group({
      category: [{ value: workout.category, disabled: true }],
      duration: [workout.duration, [Validators.required, Validators.min(1)]],
      distance: [workout.distance],
    });

    if(this.workout) {
      const distanceControl = this.form.get('distance');
      if (!distanceControl) return;
      if (this.workout.category && ['run', 'bike', 'swim', 'walk'].includes(this.workout.category)) {
        this.hideDistance = false;
        distanceControl.setValidators([Validators.required, Validators.min(0.1)]);
      } else {
        this.hideDistance = true;
        distanceControl.clearValidators();
        distanceControl.setValue(null);
      }
      distanceControl.updateValueAndValidity({ emitEvent: false });
    }
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close({
        ...this.workout,
        duration: this.form.get('duration')?.value,
        distance: this.form.get('distance')?.value
      });
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
}

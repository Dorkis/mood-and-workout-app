import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { WorkoutsService } from '../../services/workouts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.scss'
})
export class WorkoutComponent {
  user: UsersService = inject(UsersService);
  workout: WorkoutsService = inject(WorkoutsService);
  userMood: number | null = null;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.loadData();
  }

  private async loadData() {
    const data = await this.user.getUserMood();
    this.userMood = data
  }

  private formBuilder: FormBuilder = inject(FormBuilder);

  selectionForm: FormGroup = this.formBuilder.group({
    activity: new FormControl<string | null>(null, { nonNullable: false, validators: [Validators.required] })
  });

  detailsForm: FormGroup = this.formBuilder.group({
    time: new FormControl<number | null>(null, { nonNullable: false, validators: [Validators.required, Validators.min(1)] }),
    distance: new FormControl<number | null>(null)
  });

  lightActivities: string[] = ['sleep', 'walk'];
  intenseActivities: string[] = ['run', 'bike', 'swim', 'stretch'];

  get showLightSelector(): boolean {
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

  async onSubmitDetails(): Promise<void> {
    if (!this.selectionForm.valid || !this.detailsForm.valid) {
      this.selectionForm.markAllAsTouched();
      this.detailsForm.markAllAsTouched();
      return;
    }
    const currentUser = await this.user.getCurrentUser();
    if (!currentUser) {
      return;
    }
    const payload = {
      id: Math.floor(Math.random() * 1000000) + 1,
      user: currentUser,
      category: this.selectedActivity as string,
      duration: this.detailsForm.get('time')?.value as number,
      distance: (this.detailsForm.get('distance')?.value ?? null) as number | null,
    };
    const response = await this.workout.addWorkout(payload);
    if(response) {
      this.router.navigate(['/user/', currentUser.id]);
    }
  }
}

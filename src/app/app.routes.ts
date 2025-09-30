import { Routes } from '@angular/router';
import { MoodComponent } from './components/mood/mood.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  {
    path: '',
    component: MoodComponent,
    title: 'Home page - your best mood and workout app'
  },
  {
    path: 'workout',
    component: WorkoutComponent,
    title: 'Workout - your best mood and workout app'
  },
  {
    path: 'user/:id',
    component: UserComponent,
    title: 'Desktop - your best mood and workout app'
  },
];

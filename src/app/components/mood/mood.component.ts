import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Moodoptions } from '../../models/moodoptions';
import { MoodsService } from '../../services/moods.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mood',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.scss']
})
export class MoodComponent {
  description = "choose how do you feel today";

  moodService = inject(MoodsService);
  userService = inject(UsersService);
  router = inject(Router);

  moods$: Observable<Moodoptions[]> = this.moodService.getAllMoods();

  saveMood(todayMood: number): void {
    this.userService.saveUserMood(todayMood)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/workout']);
        }
      });
  }
  trackByMood(index: number, mood: Moodoptions): number {
    return mood.id;
  }

}

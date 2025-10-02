import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Moodoptions } from '../../models/moodoptions';
import { MoodsService } from '../../services/moods.service';
import { Router, RouterLink } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Mood } from '../../models/mood';

@Component({
  selector: 'app-mood',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.scss']
})
export class MoodComponent implements OnInit {
  description = "choose how do you feel today";

  private moodService = inject(MoodsService);
  private router = inject(Router);

  userId: number = environment.userId;
  showMoodSelection: boolean = false;
  loading: boolean = true;

  userMood$: Observable<Mood[]> = this.moodService.getLastUserMood(this.userId);
  moods$: Observable<Moodoptions[]> = this.moodService.getAllMoods();

  selectedMood$ = combineLatest([
    this.userMood$,
    this.moods$
  ]).pipe(
    map(([userMood, moods]) => {
      if (!userMood || userMood.length === 0 || moods.length === 0) return null;
      return moods.find(m => m.id === userMood[0].moodId) ?? null;
    })
  );

  ngOnInit() {
    this.selectedMood$.subscribe({
      next: (data) => {
        if (data === null) {
          this.showMoodSelection = false;
        }
        this.loading = false;
      },
      error: () => {
        this.showMoodSelection = true;
        this.loading = false;
      }
    });
  }


  saveMood(todayMood: number): void {
    const userMood: Mood = {
      userId: this.userId,
      moodId: todayMood,
      createdAt: new Date
    }
    this.moodService.saveUserMood(userMood)
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/workout']);
        }
      });
  }
  trackByMood(index: number, mood: Moodoptions): number {
    return mood.id;
  }

  enableMoodSelection() {
    this.showMoodSelection = true;
  }

}

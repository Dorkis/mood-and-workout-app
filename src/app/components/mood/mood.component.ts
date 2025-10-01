import { Component, inject } from '@angular/core';
import { Moodoptions } from '../../models/moodoptions';
import { MoodsService } from '../../services/moods.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-mood',
  imports: [],
  templateUrl: './mood.component.html',
  styleUrl: './mood.component.scss'
})
export class MoodComponent {
  description: string = "choose how do you feel today";
  moodOptionsList: Moodoptions[] = [];
  moodService: MoodsService = inject(MoodsService);
  userService: UsersService = inject(UsersService);

  constructor(private router: Router) {
    this.moodService.getAllMoods().then((moodOptionsList: Moodoptions[]) => {
      this.moodOptionsList = moodOptionsList;
    });
  }

  async saveMood(todayMood: number) {
    if (await this.userService.saveUserMood(todayMood)) {
      this.router.navigate(['/workout']);
    }

  }

}

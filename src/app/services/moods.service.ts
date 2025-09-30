import { Injectable } from '@angular/core';
import { Moodoptions } from '../models/moodoptions';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoodsService {

  async getAllMoods(): Promise<Moodoptions[]> {
    const data = await fetch(environment.moodUrl);
    return (await data.json() ?? []);
  }

}

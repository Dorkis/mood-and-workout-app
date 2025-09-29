import { Injectable } from '@angular/core';
import { Moodoptions } from '../models/moodoptions';

@Injectable({
  providedIn: 'root'
})
export class MoodsService {

    protected moodsList: Moodoptions[] = [
      {
        "id": 0,
        "title": "Very Good",
        "description" : "You are in very good mood",
        "photo": "https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
        "value": 10,
      },
      {
        "id": 1,
        "title": "Good",
        "description" : "You are in good mood",
        "photo": "https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
        "value": 8,
      },
      {
        "id": 2,
        "title": "so so",
        "description" : "You are in so so mood",
        "photo": "https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
        "value": 6,
      },
      {
        "id": 3,
        "title": "bad",
        "description" : "You are in bad mood",
        "photo": "https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
        "value": 4,
      },
      {
        "id": 4,
        "title": "very bad",
        "description" : "You are in very bad mood",
        "photo": "https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
        "value": 2,
      },
      {
        "id": 5,
        "title": "terrible",
        "description" : "You are in terrible mood",
        "photo": "https://angular.dev/assets/images/tutorials/common/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
        "value": 0,
      },
    ]
  

  getAllMoods(): Moodoptions[] {
    return this.moodsList;
  }

}

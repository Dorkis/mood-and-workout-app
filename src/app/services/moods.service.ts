import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Moodoptions } from '../models/moodoptions';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoodsService {

  constructor(private http: HttpClient) { }

  getAllMoods(): Observable<Moodoptions[]> {
    return this.http.get<Moodoptions[]>(environment.moodUrl)
      .pipe(
        map(data => data ?? []),
        catchError(() => of([]))
      );
  }
}

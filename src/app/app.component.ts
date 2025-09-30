import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { environment } from './environments/environment';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Your best mood and workout application is waiting for your move!';
  userId = environment.userId;
}

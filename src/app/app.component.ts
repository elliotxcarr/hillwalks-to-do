import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { SignUpPageComponent } from "./sign-up-page/sign-up-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignUpPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(router:Router) {
    router.navigate(['/login']);
  }
}

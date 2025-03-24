import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';


@Component({
  selector: 'app-page404',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page404.component.html',
  styleUrl: './page404.component.sass'
})
export class Page404Component {
  constructor(private router: Router) {}

}



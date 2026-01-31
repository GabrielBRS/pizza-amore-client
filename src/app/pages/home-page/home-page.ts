import { Component } from '@angular/core';
import {RouterModule} from '@angular/router';
import {NavBar} from '../../navigation/nav-bar/nav-bar';

@Component({
  selector: 'app-home-page',
  imports: [RouterModule, NavBar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {

}

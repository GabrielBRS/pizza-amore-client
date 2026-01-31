import { Routes } from '@angular/router';
import {HomePage} from './pages/home-page/home-page';
import {Home} from './components/home/home';

export const routes: Routes = [
  {path:'', component:HomePage, children:[
      {path:'', component:Home},
    ]},
];

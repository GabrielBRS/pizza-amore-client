import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  // Lógica de negócio dinâmica sem tipagem estrita
  public config: any = {
    theme: 'italian-clean',
    location: 'Brasília, DF',
    social: {
      whatsapp: '6199999999',
      ifood: 'pizza-amore'
    }
  };
}

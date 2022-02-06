import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable } from 'rxjs';
import { GamesService } from '../data-services/services/games.service';
import { Game } from '../data-services/types/game.type';

@Component({
  selector: 'app-site-content-and-menu',
  templateUrl: './site-content-and-menu.component.html',
  styleUrls: ['./site-content-and-menu.component.scss']
})
export class SiteContentAndMenuComponent implements OnInit {

  selectedGame: Observable<Game | undefined>;
  items: MenuItem[];

  constructor(private gamesService : GamesService) { 
    this.items = [];
    this.selectedGame = this.gamesService.getSelectedGame();
  }

  ngOnInit(): void {
    this.selectedGame.subscribe({
      next: (selectedGame) => {
        this.items = [
          {
            label: 'Games',
            icon: 'pi pi-pw pi-file',
            routerLink: ['/games']
          }, {
            label: 'Cards',
            icon: 'pi pi-pw pi-file',
            routerLink: [`/games/${selectedGame?.id}/cards`]
          }, {
            label: 'Templates',
            icon: 'pi pi-pw pi-file',
            items: [
              {
                label: 'Card Templates',
                icon: 'pi pi-pw pi-file',
                routerLink: [`/games/${selectedGame?.id}/card-templates`]
              }, {
                label: 'Print Templates',
                icon: 'pi pi-pw pi-file',
                routerLink: [`/games/${selectedGame?.id}/print-templates`]
              }
            ]
          }, {
            label: 'Export',
            icon: 'pi pi-pw pi-file'
          }
        ]
      }
    });
  }

}

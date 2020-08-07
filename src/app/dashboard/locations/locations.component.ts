import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards/cards.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  locations: Array<any> = [];

  constructor(protected cardsService: CardsService) { }

  ngOnInit(): void {
    this.getLocations();
  }

  public getLocations(): void {
    this.cardsService.getAllLocations().subscribe(value => {
      this.locations = value;
    });
  }

  public deleteCard(cardData): void {
    const confirmation = confirm('Delete card?');

    if (confirmation) {
      this.cardsService.removeCard(cardData);
    }
  }

  public identifyLocation(index, location): number {
    return location.id;
  }
}

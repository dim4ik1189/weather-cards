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
    this.locations = this.cardsService.getAllLocations().subscribe(value => {
      this.locations = value;
      console.log(this.locations);
    });
  }

  public identifyLocation(index, location): number {
    return location.id;
  }
}

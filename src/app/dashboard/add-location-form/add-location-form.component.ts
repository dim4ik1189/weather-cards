import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardsService } from '../../services/cards/cards.service';
import { Location } from '@angular/common';
import { WeatherService } from '../../services/weather/weather.service';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-add-location-form',
  templateUrl: './add-location-form.component.html',
  styleUrls: ['./add-location-form.component.scss']
})
export class AddLocationFormComponent implements OnInit {

  public addLocationForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    coordinates: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    tags: new FormControl('', [Validators.required])
  });

  constructor(
    protected cardsService: CardsService,
    private location: Location,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
  }

  public async createCard(): Promise<any> {
    const formData = this.addLocationForm.getRawValue();

    console.log(formData);

    const weatherInfo = await this.getWeatherData(formData.coordinates);

    if (weatherInfo) {
      const weatherData = {
        ...formData,
        ...weatherInfo
      };

      this.cardsService.createCard(weatherData).then(_ => this.location.back());
    }
  }

  private getWeatherData(coordinates: string): any {
    const [lat, lon] = coordinates.split(', ');

    if (lat && lon) {
      return this.weatherService.getByLatAndLon(lat, lon)
        .toPromise()
        .then(({ body }) => body)
        .catch(err => window.alert(err.message));
    }
  }
}

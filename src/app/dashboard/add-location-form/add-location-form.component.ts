import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardsService } from '../../services/cards/cards.service';
import { Location } from '@angular/common';
import { WeatherService } from '../../services/weather/weather.service';

@Component({
  selector: 'app-add-location-form',
  templateUrl: './add-location-form.component.html',
  styleUrls: ['./add-location-form.component.scss'],
})
export class AddLocationFormComponent {
  isCreatingCard = false;

  public addLocationForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    coordinates: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    tags: new FormControl('', [Validators.required]),
  });

  constructor(protected cardsService: CardsService, private location: Location, private weatherService: WeatherService) {}

  public async createCard(): Promise<any> {
    this.isCreatingCard = true;
    const formData = this.addLocationForm.getRawValue();

    const coordinatesValue = formData.coordinates.split(',');
    let weatherInfo;

    if (coordinatesValue.length > 1 && Number(coordinatesValue[0]) && Number(coordinatesValue[1])) {
      const [lat, lon] = coordinatesValue;
      weatherInfo = await this.getWeatherDataByCoords(lat.trim(), lon.trim());
    } else {
      weatherInfo = await this.getWeatherDataByCity(coordinatesValue[0]);
    }

    if (weatherInfo) {
      const weatherData = {
        ...formData,
        ...weatherInfo,
      };

      this.cardsService.createCard(weatherData).then(_ => this.location.back());
    }
  }

  private getWeatherDataByCoords(lat: string, lon: string): any {
    if (lat && lon) {
      return this.weatherService
        .getByLatAndLon(lat, lon)
        .toPromise()
        .then(({ body }) => body)
        .catch(({ error }) => window.alert(error.message))
        .finally(() => (this.isCreatingCard = false));
    }
  }

  private getWeatherDataByCity(cityName: string): any {
    if (cityName && String(cityName)) {
      return this.weatherService
        .getByCityName(cityName)
        .toPromise()
        .then(({ body }) => body)
        .catch(({ error }) => window.alert(error.message))
        .finally(() => (this.isCreatingCard = false));
    }
  }
}

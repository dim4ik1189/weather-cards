import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const API_KEY = environment.weatherServiceApi;
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getByLatAndLon(lat: string, lon: string): any {
    return this.http.get<any>(
      `${BASE_URL}?lat=${lat}&lon=${lon}&APPID=${API_KEY}`, { observe: 'response' });
  }

  getByCityName(city: string): any {
    return this.http.get<any>(
      `${BASE_URL}?q=${city}&APPID=${API_KEY}`, { observe: 'response' });
  }
}

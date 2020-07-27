import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_KEY =  '0ecc34d6d329fb1c62bcf0bf7778ebb1';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getByLatAndLon(lat: string, lon: string): any {
    return this.http.get<any>(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`,
      {
        observe: 'response'
      });
  }
}

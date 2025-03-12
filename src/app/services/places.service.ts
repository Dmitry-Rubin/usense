import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {environment} from "../../environments/environment";
import {IApiResponse} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private apiSearchUrl = 'https://api.foursquare.com/v3/places/search';
  private apiPlaceId = 'https://api.foursquare.com/v3/places/';
  private apiKey = environment.foursquareApiKey;
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheDuration = 10 * 60 * 1000;

  constructor(private http: HttpClient) {}

  searchPlaces(query: string, ll: string): Observable<IApiResponse> {
    const cacheKey = `search_${query}_${ll}`;
    const cachedData = this.cache.get(cacheKey);

    if (cachedData && Date.now() - cachedData.timestamp < this.cacheDuration) {
      return of(cachedData.data);
    }

    const params = {
      query: query,
      ll: `${ll}`,
      limit: '10',
    };

    const headers = {
      Authorization: this.apiKey,
    };

    return this.http.get<IApiResponse>(this.apiSearchUrl, { params, headers }).pipe(
      tap((data) => {
        this.cache.set(cacheKey, { data, timestamp: Date.now() });
      }),
      catchError((error) => {
        console.error('Error fetching search results:', error);
        throw error;
      })
    );
  }

  getPlaceDetails(fsq_id: string): Observable<any> {
    const cachedData = this.cache.get(fsq_id);

    if (cachedData && Date.now() - cachedData.timestamp < this.cacheDuration) {
      return of(cachedData.data);
    }

    const headers = {
      Authorization: this.apiKey,
      accept: 'application/json',
    };

    return this.http.get(`${this.apiPlaceId}${fsq_id}`, { headers }).pipe(
      tap((data) => {
        this.cache.set(fsq_id, { data, timestamp: Date.now() });
      }),
      catchError((error) => {
        console.error('Error fetching place details:', error);
        throw error;
      })
    );
  }

  clearCache(): void {
    this.cache.clear();
  }
}

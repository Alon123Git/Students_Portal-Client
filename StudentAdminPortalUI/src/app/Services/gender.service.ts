import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gender } from '../Models/APIModels/Gender.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseApiUri = environment.baseApiUri;

  constructor(private httpClient: HttpClient) { }

  getGenderList(): Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.baseApiUri + '/genders');
  }
}

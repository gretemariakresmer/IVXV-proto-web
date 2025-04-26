import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartyGroup } from '../choose/model/party-group';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PartyService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.apiUrl}/api/parties`;
  getPartiesWithCandidates(): Observable<PartyGroup[]> {
    return this.http.get<PartyGroup[]>(`${this.baseUrl}/candidates`);
  }
}

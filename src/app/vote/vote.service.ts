import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Vote} from './vote';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private baseUrl = `${environment.apiUrl}/api/votes`;

  constructor(private http: HttpClient) { }

  getVotes(): Observable<Vote[]> {
    return this.http.get<Vote[]>(this.baseUrl);
  }

  getVote(id: number): Observable<Vote> {
    return this.http.get<Vote>(`${this.baseUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SelectionInformation } from '../voting/choose/model/selection-information';
import { VoteResponse } from '../voting/choose/model/vote-response';
import { BlockDto } from '../check/model/block-dto';

@Injectable({ providedIn: 'root' })
export class VoteService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.apiUrl}/api/votes`;

  getRecent(): Observable<BlockDto[]> {
    return this.http.get<BlockDto[]>(this.baseUrl);
  }

  search(term: string): Observable<BlockDto[]> {
    const params = new HttpParams()
      .set('term',   term);
    return this.http.get<BlockDto[]>(`${this.baseUrl}/search`, { params });
  }

  stream(): Observable<BlockDto> {
    return new Observable(observer => {
      const es = new EventSource(`${this.baseUrl}/stream`);
      es.addEventListener('new-vote', (e: MessageEvent) => {
        observer.next(JSON.parse(e.data));
      });
      es.onerror   = err => observer.error(err);
      return () => es.close();
    });
  }

  submitVote(selection: SelectionInformation): Observable<VoteResponse> {
    return this.http.post<VoteResponse>(`${this.baseUrl}`, {
      personId: selection.person.id,
      party: selection.partyName,
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SelectionInformation } from '../voting/choose/model/selection-information';
import { VoteResponse } from '../voting/choose/model/vote-response';
import { BlockDto } from '../check/model/block-dto';

@Injectable({ providedIn: 'root' })
export class VoteService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.apiUrl}/api/votes`;

  getVotes(): Observable<BlockDto[]> {
    return this.http.get<BlockDto[]>(this.baseUrl);
  }

  submitVote(selection: SelectionInformation): Observable<VoteResponse> {
    return this.http.post<VoteResponse>(`${this.baseUrl}`, {
      personId: selection.person.id,
      party: selection.partyName,
    });
  }
}

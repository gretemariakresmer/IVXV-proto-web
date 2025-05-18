import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VoteResponse } from '../voting/choose/model/vote-response';
import { BlockDto } from '../check/model/block-dto';
import { EncryptPreviewDto } from '../voting/choose/model/encrypt-preview-dto';

@Injectable({ providedIn: 'root' })
export class VoteService {
  constructor(private http: HttpClient) {}

  private baseUrl = `${environment.apiUrl}/api/votes`;

  preview(candidateId: Number): Observable<EncryptPreviewDto> {
    return this.http.post<EncryptPreviewDto>(
      `${this.baseUrl}/preview?candidate=${candidateId}`, {}
    );
  }

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

  confirm(previewToken: string): Observable<VoteResponse> {
    return this.http.post<VoteResponse>(
      `${this.baseUrl}?previewToken=${previewToken}`, {}
    );
  }
}

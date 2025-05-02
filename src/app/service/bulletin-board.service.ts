import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlockDto } from '../check/model/block-dto';

@Injectable({ providedIn: 'root' })
export class BulletinBoardService {
  private readonly api = '/api/bulletin/chain';

  constructor(private http: HttpClient) {}

  listChain(): Observable<BlockDto[]> {
    return this.http.get<BlockDto[]>(this.api);
  }
}

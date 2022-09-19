import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { commentsDTO } from 'src/models/comments.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../api/api.config';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }
  findAll(): Observable<commentsDTO[]> {
    return this.http.get<commentsDTO[]>(`${API_CONFIG.baseUrl}comments`);
  }
  postComments(obj: commentsDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}comments`,
      obj,
      {
        observe: 'response',
        responseType: 'text'
      }
    );

  }
  delete(id: number) {
    return this.http.delete(`${API_CONFIG.baseUrl}comments/${id}`);
  }
  getConsultar(id: number): Observable<commentsDTO> {
    return this.http.get<commentsDTO>(`${API_CONFIG.baseUrl}comments/${id}`);
  }
  putComments(id: any, obj: commentsDTO) {
    return this.http.put(`${API_CONFIG.baseUrl}comments/${id}`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}

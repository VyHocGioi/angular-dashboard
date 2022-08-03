import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff1 } from '../models/Staffs';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private http: HttpClient) {}
  getStaffs(): Observable<Staff1[]> {
    return this.http.get<Staff1[]>('http://localhost:8000/api/items/');
  }
  insertStaffs(item: Staff1): Observable<Staff1> {
    const headers = { 'content-type': 'application/json' };
    //	console.log(JSON.stringify(item))
    return this.http.post<Staff1>('http://localhost:8000/api/insert/', item, {
      headers: headers,
    });
  }
  updateStaffs(item: Staff1): Observable<Staff1> {
    const headers = { 'content-type': 'application/json' };
    console.log(JSON.stringify(item));
    return this.http.put<Staff1>('http://localhost:8000/api/update', item, {
      headers: headers,
    });
  }

  deleteStaffs(id: number): Observable<ArrayBuffer> {
    const headers = { 'content-type': 'application/json' };
    console.log(id);
    return this.http.delete<ArrayBuffer>(
      'http://localhost:8000/api/delete/:' + id,
      { headers: headers }
    );
  }
}

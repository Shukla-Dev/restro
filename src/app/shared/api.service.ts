import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api_url = "http://localhost:3000/posts"
  constructor(private _http:HttpClient) { }
  postRestro( data: any ){
    return this._http.post<any>("http://localhost:3000/posts", data).pipe(map((res:any) => {
      return res;
    }))
  }
 
  getRestro(){
    return this._http.get<any>("http://localhost:3000/posts").pipe(map ((res:any) => {
      return res;
    }))
  }

  updateRestro(data:any, id:number){
    return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any) => {
      return res;
    }))
  }

  deleteRestro(id:number){
    return this._http.delete<any>("http://localhost:3000/posts"+id)
  }

  delete(id: any): Observable<any> {
    var API_URL = `${this.api_url}/${id}`;
    return this._http.delete(API_URL)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claim } from './claim';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimServiceService {

  constructor(private httpClient:HttpClient) { }

  api="http://localhost:8080/claim"

  public saveEmployee(claims:Claim):Observable<Claim>{
    return this.httpClient.post<Claim>(`${this.api}/data`, claims)
  }

  public getEmployee():Observable<Claim[]>{
    return this.httpClient.get<Claim[]>(`${this.api}/entry`)
  }

  public deleteClaim(claimNo: String){
    return this.httpClient.delete(`${this.api}/${claimNo}`)
  }
}

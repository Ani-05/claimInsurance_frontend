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

  public updateInsurerFields(payload: { [key: string]: string }): Observable<any> {
    return this.httpClient.patch(`${this.api}/claim/update-insurer-fields`, payload);
  }

  public deleteClaim(claimNo: String){
    return this.httpClient.delete(`${this.api}/${claimNo}`,{ responseType: 'text' })
  }

  public searchByClaimNo(claimNo: string): Observable<Claim> {
    return this.httpClient.get<Claim>(`${this.api}/search/by-claimNo/${claimNo}`);
  }

  public searchByClaimType(claimType: string): Observable<Claim[]> {
    return this.httpClient.get<Claim[]>(`${this.api}/search/by-claimType/${claimType}`);
  }

  public searchByPolicy(policyNo: string): Observable<Claim[]> {
    return this.httpClient.get<Claim[]>(`${this.api}/search/by-policy/${policyNo}`);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  Url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  crypt(data: any, isEncrypt: boolean) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'VSAuth vsauth_method="SharedSecret",vsauth_data="UEBzc3cwcmQ=",vsauth_identity_ascii="leonardo.leonardo@virtusindonesia.com",vsauth_version="200"' });
    let options = { headers: headers };
    
    if(isEncrypt){
      return this.http.post<any>(`https://10.8.150.141/vibesimple/rest/v1/protect-fields`, data, options);
    } else {
      return this.http.post<any>(`https://10.8.150.141/vibesimple/rest/v1/access-fields`, data, options);
    }
  }
}

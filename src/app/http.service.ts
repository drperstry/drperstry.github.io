import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  getBeer() {
    return this.http.get('https://api.openbrewerydb.org/breweries')
  }
  getcoins(){
    return this.http.get('https://api.coingecko.com/api/v3/finance_platforms')
  }
  getexecuses(k:number){
    var url="https://excuser.herokuapp.com/v1/excuse/"+k;
    return this.http.get(url)
  }
}

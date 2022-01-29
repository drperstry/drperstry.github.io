import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-my-play-ground',
  templateUrl: './my-play-ground.component.html',
  styleUrls: ['./my-play-ground.component.scss']
})
export class MyPlayGroundComponent implements OnInit {

  clickcounter: number = 0;
  coins:any=[];
  excuses:any=[];
  name: string = '';  // add this
  constructor(private _http:HttpService) { }

  ngOnInit() {
    this._http.getcoins().subscribe(data => {
      this.coins = data});
  }
  
  getexcuses(k:number){
    this._http.getexecuses(k).subscribe(data => {
      this.excuses = data});
  }

  countClick() {
    this.clickcounter += 1;
  }
  setClasses() {
    let myClasses = {
      active: this.clickcounter > 4,
      notactive: this.clickcounter <= 4
    };
    return myClasses;
  }
}

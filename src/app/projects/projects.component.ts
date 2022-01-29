import { Component, NgIterable, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  clickcounter: number = 0;
  coins:any=[];
  name: string = '';  // add this
  constructor(private _http:HttpService) { }

  ngOnInit() {
    this._http.getcoins().subscribe(data => {
      this.coins = data});
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

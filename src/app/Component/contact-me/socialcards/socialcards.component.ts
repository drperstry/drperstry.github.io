import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-socialcards',
  templateUrl: './socialcards.component.html',
  styleUrls: ['./socialcards.component.scss']
})
export class SocialcardsComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() link = ''
  @Input() class = ''

  ngOnInit(): void {
  }

}

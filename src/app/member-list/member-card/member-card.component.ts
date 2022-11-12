import { Component, OnInit,Input } from '@angular/core';
import { Member } from 'src/app/_Models/memebr';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() getMembers:Member;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { initSettings, sidebarNav } from './init';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      $(initSettings);
      $(sidebarNav);
    }, 0);
  }

}

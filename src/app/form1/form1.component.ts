import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {

  data: any = {
    title: 'Will',
    subtitle: 'Hello World'
  };

  constructor() { }

  ngOnInit() {
  }

  doSubmit(form) {
    console.log(form);
    if (form.valid) {
      // HTTP POST
    }
  }
}

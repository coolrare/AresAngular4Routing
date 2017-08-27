import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  type;
  name;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.type = this.route.snapshot.params['type'];
    this.route.params.subscribe(params => {
      this.type = params['type'];
      if (params['name']) {
        this.name = params['name'];
      }
    });
    this.route.queryParams.subscribe(params => {
      if (params['name']) {
        this.name = params['name'];
      }
    });
  }

  goCardsPlus1(type) {
    var num = +type;
    this.router.navigateByUrl('/cards/' + (num+1));
  }

  goCardsMinus1(type) {
    var num = +type;
    this.router.navigateByUrl('/cards/' + (num-1));
  }

}

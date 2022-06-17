import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html'
})
export class OrdersDetailComponent implements OnInit, OnDestroy {
  endSubs$: Subject<any> = new Subject();
  
  constructor() { }
  // TODO : Need to work with the to do page

  ngOnInit(): void {
    console.log(`orders detail component`);
  }

  ngOnDestroy(): void {
    this.endSubs$.complete();
    this.endSubs$.unsubscribe();
  }
}

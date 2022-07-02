import { UsersService } from '@alligatorspace/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'alligatorshop-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  title = 'alligatorshop';

  constructor(private usersService: UsersService) {
    
  }

  ngOnInit(): void {
    this.usersService.initAppSession();
  }


}

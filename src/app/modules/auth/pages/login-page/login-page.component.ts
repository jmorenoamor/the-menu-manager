import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from  'src/app/modules/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    public authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
  }

}

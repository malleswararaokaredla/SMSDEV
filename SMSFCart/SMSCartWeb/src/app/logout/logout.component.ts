import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router) {

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("expiration");
    sessionStorage.removeItem("catcount");
    sessionStorage.removeItem("phone");
    sessionStorage.removeItem("rid");
    sessionStorage.removeItem("UType");
    this.router.navigate(['/home']);
  }

  ngOnInit() {

  }

}

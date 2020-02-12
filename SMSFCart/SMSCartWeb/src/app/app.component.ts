import { Component, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
 
})
export class AppComponent {

  show: boolean = true;

  title = 'fancystoreapp';

  constructor(public dialog: MatDialog, private router: Router, private location: Location) {
//Added by sudha on 07/01/19 to avoid home page load in in Browser refresh
    if (!sessionStorage.getItem("token")) {
    this.router.navigateByUrl("/home");
    }   
  }


  ngOnInit() { }  

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog { }



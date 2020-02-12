import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { LoginModel } from '../models/loginModel';
import { UserRegisterModel } from '../models/UserRegisterModel';
import { Router } from '@angular/router';
import { ALLOW_MULTIPLE_PLATFORMS } from '@angular/core/src/application_ref';
import { SmsfashionapiService } from '../services/smsfashionapi.service';
import { ToastrService } from 'ngx-toastr';
import { CheckEmail } from '../models/CheckForUniqueEmail';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errmsg: string;

  login: LoginModel = {
    email: null,
    password: null
  }

  reg: UserRegisterModel = {
    firstname: null,
    lastname: null,
    email: null,
    phoneno: null,
    password: null,
    confirmpassword: null,
    gender: null
  };


  chkemail: CheckEmail = {
    email: null
  };
  CheckEmail

  constructor(private dialogRef: MatDialogRef<LoginComponent>, public dialog: MatDialog, private router: Router, private dataservice: SmsfashionapiService,
    private toastr: ToastrService) {

  }

  ngOnInit() {

  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  //openregmodel() {
  //  this.dialogRef.close();
  //  this.dialog.open(Signupdialog, { width: '500px', height:'350px' });
  //}
  loginclosemodel() {
    this.dialogRef.close();
  }
  submitlogdata(login) {

    if (this.login.email != null) {

     
      this.dataservice.Loginapi(login.value).subscribe(data => {


        sessionStorage.setItem('token', data['token']);
        sessionStorage.setItem('email', data['email']);
        sessionStorage.setItem('userName', data['userName']);
        sessionStorage.setItem('uid', data['uid']);
        sessionStorage.setItem('phone', data['phone']);
        this.dialogRef.close();
        // this.router.navigate(['/home'])
        sessionStorage.setItem('expiration', data['expiration']);
        sessionStorage.setItem('catcount','0');
        this.BagInfomation();
        this.toastr.success("Hello   " + sessionStorage.getItem("userName"), "Welcome To Fashion", {
          timeOut: 1000, positionClass: 'toast-top-right'
        });
      },
        error => {
          this.toastr.error("Invalid Login Details", "Login", {
            timeOut: 2000, positionClass: 'toast-top-right'
          });

        }
      )
    }

    //this.dialogRef.close();
    //this.router.navigateByUrl('/womenstore');
  }
  submitregdata(reg): void {
    if (this.reg.email != null) {

      this.dataservice.AddUserapi(reg.value).subscribe(x => {
    
        this.dialogRef.close();

        this.toastr.success("New User Added Successfully", "Register", {
          timeOut: 1000, positionClass: 'toast-top-right'
        });
      },
        error => {

          //if (error["status"] == 200) {
          //  this.dialogRef.close();

          //  this.toastr.success("New User Added Successfully", "Register");
          //  console.log("Error", error);
          //}

        });
    }
  }

  callcheckusernameapi() {


    this.chkemail.email = this.reg.email;

    this.dataservice.Checkuseremailapi("swathi.chinnala@gmail.com").subscribe(data => {

      if (data == false) {
        this.errmsg = "";
      }
      else {
        this.errmsg = "Email Id Already Exist";
      }

    },
      error => {
      })

    //this.dataserv.CheckUserNmae(this.chkname).subscribe(

    //  data => {
    //    console.log(data);
    //    if (data["name"] == "") {
    //      this.errmsg = "";
    //    }
    //    else {
    //      this.errmsg = data["name"];
    //    }

    //  },
    //  error => {

    //    console.log("Error", error);
    //  });
  }


  BagInfomation() {
    this.dataservice.GetBagItemsDetailsById(Number.parseInt(sessionStorage.getItem("uid"))).subscribe(x => {
      this.dataservice.bagiformationbyid = x["res"]["table"];
    
    });
  }
}




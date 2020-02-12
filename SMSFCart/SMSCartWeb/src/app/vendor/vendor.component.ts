import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EntryService } from '../services/entry.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Vendor } from '../models/Vendor';
import { CheckEmail } from '../models/CheckForUniqueEmail';
import{MatDatepicker}from '@angular/material/datepicker';
//M
import{HttpClient}from '@angular/common/http';
import{SmsfashionapiService}from '../services/smsfashionapi.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit { 

  vendor:Vendor;
  products:string[]; 
  errmsg:string;
  
  // mindate=new Date(2000,0,1);
  // maxdate=new Date(2030,0,1);
  chkemail: CheckEmail = {
    email: null
  };

  CheckEmail   

  isUserLoggedIn: boolean=false;

  constructor(private entryService : EntryService,private router : Router,private toastr: ToastrService,private httpserviec:HttpClient,private dataservice: SmsfashionapiService) { 
  }
                      
  ngOnInit() {  
    debugger
    this.resetForm();
  }
  
    OnLogin(email,password) {
      debugger
      if(email !=null && password !=null)
      {
        this.entryService.userAuthentication(email,password).subscribe(data  => {
 
        sessionStorage.setItem('token', data['token']);
        sessionStorage.setItem('email', data['email']);
        sessionStorage.setItem('userName', data['userName']);
        sessionStorage.setItem('uid', data['uid']);
        sessionStorage.setItem('rid', data['rid']);
        sessionStorage.setItem('expiration', data['expiration']);

        var utype="";
        var RID = parseInt(sessionStorage.getItem("rid"));

        if(RID == 1)
        {
          utype="Admin";   
        }
        else if (RID ==2)
        {
          utype="Vendor";        
        }
        
        sessionStorage.setItem('UType', utype);
       
        this.router.navigateByUrl('/welcome');          
        var wmsg=" Welcome To " + utype +" Portal";

        this.toastr.success("Hello " + sessionStorage.getItem("userName"), wmsg );
        this.isUserLoggedIn = true;
        debugger
    },
        error => {
           this.toastr.error("Invalid Login Details", "Login");           
        }
      )
      }  
    }

    onRegister(form: NgForm) {
      this.entryService.registerVender(form.value)    
      .subscribe((data: any) => {
        //M
        this.toastr.success(data["res"],"User Registarion");
      },
      error=>{
        this.toastr.error("Email already exists"); 
      });
  }

  resetForm(form? : NgForm)
{
  if(form != null)
  form.reset();
    this.vendor = {
      FirstName:'',
      LastName:'',
      Email:'',
      Password:'',
      ConfirmPassword:'',
      PhoneNo:'',
      Logo:'',     
      ISActive:0,
      PID:0,
      Image:"",
      Gender:""     
    }

  }

  closemodel()
  {    
    this.router.navigateByUrl('home');
  }

  callcheckusernameapi() {   
    this.chkemail.email = this.vendor.Email;
  
    this.dataservice.Checkuseremailapi(this.chkemail.email).subscribe(data => {
     debugger
      if (data == false) {
       this.errmsg = "";
        }
        else {
          this.errmsg = "Email Id Already Exist";
        }

      },
      error => {

        console.log("Error", error);
      })

  } 
}

import { Component, OnInit, ElementRef, VERSION, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { AddVendor } from '../models/AddVendor';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from '../services/nav.service';
import { NavItem } from '../models/nav-item';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { CommonService } from '../services/common.service';
import { VendorValidatorService } from '../services/vendor-validator.service';

import {PageEvent} from '@angular/material';
import { EntryService } from '../services/entry.service';

@Component({
  selector: 'app-editlist',
  providers: [
    {provide: ValidatorService, useClass: VendorValidatorService }
  ],
  templateUrl: './editlist.component.html',
  styleUrls: ['./editlist.component.scss']
})
export class EditlistComponent implements OnInit {

  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;  
  
  Role:string;
  Ltype:string;

  Addvendor: AddVendor ={
    uid : 0,
    FirstName : null,
    LastName : null,
    Email : null,
    PhoneNo : null,  
    password : null, 
    gender:null,
  };

  
  show:boolean ;
 
  navItems: NavItem[];//List Items array


  vendorList1:Array<any> = [];

  columnsToDisplay = ['firstName', 'lastName', 'email','phoneNo','actionsColumn'];
    
  @Input() vendorList:Array<any>=[] ;

  @Output() vendorListChange = new EventEmitter<AddVendor[]>();

  dataSource: TableDataSource<AddVendor>;

  // MatPaginator Inputs
   length = 1;
   pageSize = 1;
   pageSizeOptions = [1, 5, 10, 25, 100];
 
   // MatPaginator Output
   pageEvent: PageEvent;
 
   setPageSizeOptions(setPageSizeOptionsInput: string) {
     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
   }


  uType :string="";  
  RoleName:string="";
 
  DynamicPassword:string="";
  uid:number;
  stremail:string;
  strpassword:string;
  gender:string;
  IsEmailExists:boolean=true;

  res:boolean=false;

  constructor(private adminService: AdminService,private toastr : ToastrService,private route:ActivatedRoute,
  private router: Router,private navService: NavService, private commonService: CommonService
  ,private VendorValidator: ValidatorService,private dataservice: EntryService
  ) 
  {      
    //To get menu
    this.navItems= this.navService.navItems;   
  }  


  ngOnInit() {

    //This is to get Type
    this.uType = sessionStorage.getItem('UType'); 

    //This for side menu 
    this.navService.appDrawer = this.appDrawer;

    //This is Check Vendor / User collection
     this.Role = this.route.snapshot.params['Role']; 
     
     if(this.Role == '2')
     {
      this.RoleName="Vendor's";
     }    
    
    this.getList();     
  }

getList()
{ 
  
    this.adminService.GetAllVendorsByActiveStatus(1).subscribe((vdata: AddVendor[])=>{
      this.vendorList = vdata["vendordata"]["table"]; 
      if(this.vendorList.length > 0) 
      {
        this.show = true;
      }
      else{
        this.show=false;
      }
      this.dataSource = new TableDataSource<any>(this.vendorList, AddVendor, this.VendorValidator);      
      this.dataSource.datasourceSubject.subscribe(vendorList => this.vendorListChange.emit(vendorList));
    },
    error => {
      if (error["status"] == 401) {         
        this.toastr.error("Your session expired");
        sessionStorage.clear();
        this.router.navigate(['/vendor']);
      }
    }); 
}


randomPassword() {
 // var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
 var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOP1234567890";
  var pass = "";
  for (var x = 0; x < 10; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
  } 
  return pass;
}

UniqueEmail(Email,uid) : boolean
{ 
  if(Email!=null && uid == 0)
  {   
   this.dataservice.CheckEmail(Email).subscribe(data =>
    {
      if(data["res"] == true)
        {     
          this.res=true;
        }    
      },
      error => {
        if (error["status"] == 401) {         
          this.toastr.error("Your session expired");
          sessionStorage.clear();
          this.router.navigate(['/vendor']);
        }     
        this.res=true;
    })
  }
  else  if(Email!=null && uid > 0)
  {   
    this.adminService.CheckMailForExistVendor(Email).subscribe(data =>
      {  
        if(data["res"] != uid) 
        {
          if(data["res"] > 0) 
          {
            this.res = true;
          }
          if(data["res"] == 0) 
          {
            this.res = false;
          }
        }
      },
      error => {
        if (error["status"] == 401) {         
          this.toastr.error("Your session expired");
          sessionStorage.clear();
          this.router.navigate(['/vendor']);
        }     
        this.res = true;
    })
  }
    return this.res;
} 


confirmEditCreate(row)
{  
  this.uid=Number.parseInt(row["currentData"]["uid"]);  
  
  this.stremail=row["currentData"]["email"]; 
  this.strpassword=row["currentData"]["password"];
  this.gender=row["currentData"]["gender"];

    if(this.uid == 0 )
    {
      //To generate random password for new Vendor
      this.DynamicPassword= this.randomPassword();
      this.strpassword = this.DynamicPassword; 
      this.gender="Male";
    } 
  
//EmaiID Validation
    this.IsEmailExists= this.UniqueEmail(this.stremail,this.uid);  

    if(!this.IsEmailExists)
      {     
          this.Addvendor.uid= this.uid;
          this.Addvendor.FirstName=row["currentData"]["firstName"];
          this.Addvendor.LastName=row["currentData"]["lastName"];
          this.Addvendor.Email=row["currentData"]["email"];
          this.Addvendor.PhoneNo=row["currentData"]["phoneNo"];    
          this.Addvendor.password=this.strpassword;
          this.Addvendor.gender=this.gender;

          this.adminService.AddorEditVenderByAdmin(this.Addvendor) 
          .subscribe((data: any) => {  
            //This is to fill vendor list
            this.getList();   
            this.toastr.success(data["res"],"Vendor Added / Updated Successfully");
          },
          error =>{
            this.toastr.error(error,"Vendor Not Add / Updated "); 
          });     
      } 
      else
      {
        this.toastr.warning("Email Id Already Exist"); 
      } 
  }   
     


  cancelOrDelete(uid) 
  {    
      if (confirm('Are you sure to delete this record ?') == true) 
      {   
        if (uid != 0) 
        {
            this.adminService.DeleteVendor(uid)
            .subscribe(x => {
              this.getList();
              this.toastr.success("Deleted Successfully","Vendor Register");
            })
        }
      }  
      else
      {
        this.getList();
      }              
  }
 
//Mail
}

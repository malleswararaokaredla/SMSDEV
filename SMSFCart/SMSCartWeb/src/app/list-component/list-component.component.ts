import { Component, OnInit, ElementRef, VERSION, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { Vendor } from '../models/Vendor';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserPersonalData } from '../models/UserPersonalData';
import { NavService } from '../services/nav.service';
import { NavItem } from '../models/nav-item';

import {animate, state, style, transition, trigger} from '@angular/animations';

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


import {SelectionModel} from '@angular/cdk/collections';
import { CommonService } from '../services/common.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponentComponent implements OnInit {
 
  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;  
  
  Role:string;
  Ltype:string;

  vendor: Vendor;
  user:UserPersonalData;
  //adr:Address;

  navItems: NavItem[];//List Items array

  vendorList:Array<any> = [];
  userList:Array<any>=[];
  show:boolean ;

  disimg:string;
  pimgpath:string;

  dataSource: MatTableDataSource<Vendor>;
  IsReload:boolean = true;

  //columnsToDisplay = ['firstName', 'lastName', 'email','uid','select','actionsColumn'];
  columnsToDisplay = ['firstName', 'lastName', 'email','phoneNo'];
  
  FNFilter = new FormControl('');
  LNFilter = new FormControl('');

  //Search
  filterValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: ''
  };

  uType :string="";  
  RoleName:string="";
  isInitialized:boolean;
 
  selection = new SelectionModel<Vendor>(true, []);
    
    
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
 
  constructor(private adminService: AdminService,private toastr : ToastrService,private route:ActivatedRoute,
  private router: Router,private navService: NavService, private commonService: CommonService) 
  {       
    //To get menu
    this.navItems= this.navService.navItems;

    //To Load default image
    this.disimg = this.commonService.getNoImage();

    
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;      
   }

   this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         // trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
         // if you need to scroll back to top, here is the right place
         window.scrollTo(0, 0);
      }
  });

}
  

 createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data:any, filter:string): boolean {
      let searchTerms = JSON.parse(filter);
      return data.firstName.toLowerCase().indexOf(searchTerms.firstName) !== -1
        && data.lastName.toString().toLowerCase().indexOf(searchTerms.lastName) !== -1;
        //&& data.email.toLowerCase().indexOf(searchTerms.email) !== -1
        //&& data.phoneNo.toLowerCase().indexOf(searchTerms.phoneno) !== -1;
    }
    return filterFunction;
  }


  ngOnInit() {
    //This is to get Type
    this.uType = sessionStorage.getItem('UType'); 

    //This for side menu 
    this.navService.appDrawer = this.appDrawer;

    //To get menu
    this.navItems= this.navService.navItems;       

    //This is Check Vendor / User collection
     this.Role = this.route.snapshot.params['Role']; 
     
     if(this.Role == '2')
     {
      this.RoleName="Vendor's";
      //this.getVendorList();  
     }
     
    if(this.Role == '3')
     {
      this.RoleName="User's";
     // this.getUserList();  
     }

    //This is Check Type of List
    this.Ltype=this.route.snapshot.params['LType']; 
    
    this.getList();

    this.FNFilter.valueChanges
      .subscribe(
       firstName => {
          this.filterValues.firstName = firstName;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    this.LNFilter.valueChanges
      .subscribe(
        lastName => {
          this.filterValues.lastName = lastName;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )    
  }

getList()
{    
 
  if (this.Ltype=="AlV")
    {   
         
      this.adminService.GetVendorList().subscribe((vdata: Vendor[])=>{       
       this.vendorList = vdata["vendordata"]["table"]; 
       const users = vdata["vendordata"]["table"];
       
       if(this.vendorList.length > 0) 
      {
        this.show = true;
      }
      else
      {
        this.show = false;
      }

       this.dataSource = new MatTableDataSource(users); 

       this.dataSource.filterPredicate = this.createFilter();

       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;  
      
      },
      error => {
        if (error["status"] == 401) {         
          this.toastr.error("Your session expired");
          sessionStorage.clear();
          this.router.navigate(['/vendor']);
        }

      });  
      
    }

  if (this.Ltype=="AlU")
    {     
      
      this.adminService.GetUserList().subscribe((udata: UserPersonalData[])=>{
       this.userList = udata["userdata"]["table"]; 
       const users = udata["userdata"]["table"];   
       
       if(this.userList.length > 0) 
       {
         this.show = true;
       }
       else
       {
         this.show = false;
       }

       this.dataSource = new MatTableDataSource(users); 
      
       this.dataSource.filterPredicate = this.createFilter();

       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;

      },
      error => {
        if (error["status"] == 401) {         
          this.toastr.error("Your session expired");
          sessionStorage.clear();
          this.router.navigate(['/vendor']);
        }

      });  
      
    }
    else
    {
      this.adminService.selectedUser = Object.assign({}, this.user);;
    }    
   
} 

  applyFilter(filterValue: string) 
  {  
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  

 
}

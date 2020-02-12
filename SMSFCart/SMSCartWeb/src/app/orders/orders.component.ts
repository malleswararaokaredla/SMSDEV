import { Component, OnInit, ElementRef, VERSION, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NavService } from '../services/nav.service';
import { NavItem } from '../models/nav-item';

import {animate, state, style, transition, trigger} from '@angular/animations';

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


import {SelectionModel} from '@angular/cdk/collections';
import { CommonService } from '../services/common.service';
import { FormControl } from '@angular/forms';
import { OrdersModel } from '../models/Orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class OrdersComponent implements OnInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;  
  
  Role:string;
  Ltype:string;

  navItems: NavItem[];//List Items array

  ordersList:Array<any> = [];  
  show:boolean ;

 
  dataSource: MatTableDataSource<OrdersModel>;
  IsReload:boolean = true;

  columnsToDisplay = ['UserName', 'VendorName', 'ord_date','ord_status'];
  
  UNFilter = new FormControl('');
  VNFilter = new FormControl('');

  //Search
  filterValues = {
    UserName: '',
    VendorName: ''
  };

  uType :string="";  
  RoleName:string="";
  isInitialized:boolean;
 
  selection = new SelectionModel<OrdersModel>(true, []);
    
    
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
 
  constructor(private adminService: AdminService,private toastr : ToastrService,private route:ActivatedRoute,
  private router: Router,private navService: NavService, private commonService: CommonService) 
  {       
    //To get menu
    this.navItems= this.navService.navItems;
     
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
      return data.UserName.toLowerCase().indexOf(searchTerms.userName) !== -1
        && data.VendorName.toString().toLowerCase().indexOf(searchTerms.VendorName) !== -1;        
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
   
    
    this.getOrdersList();

    this.UNFilter.valueChanges
      .subscribe(
        UserName => {
          this.filterValues.UserName = UserName;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    this.VNFilter.valueChanges
      .subscribe(
        VendorName => {
          this.filterValues.VendorName = VendorName;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )    
  }

  getOrdersList()
    {        
      this.adminService.GeyAllOrdersDetails().subscribe((ordersdata: OrdersModel[])=>{       
       this.ordersList = ordersdata["ordersdata"]["table"]; 
        
       if(this.ordersList.length > 0) 
      {
        this.show = true;
      }
      else
      {
        this.show = false;
      }

       this.dataSource = new MatTableDataSource(this.ordersList); 

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

  applyFilter(filterValue: string) 
  {  
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  

 
}


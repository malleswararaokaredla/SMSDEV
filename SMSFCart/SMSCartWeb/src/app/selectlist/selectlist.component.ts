import { Component, OnInit, ElementRef, VERSION, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NavService } from '../services/nav.service';
import { NavItem } from '../models/nav-item';

import { MatPaginator, MatTableDataSource } from '@angular/material';

import { SelectionModel } from '@angular/cdk/collections';
import { CommonService } from '../services/common.service';
import { FormControl } from '@angular/forms';
import { AddVendor } from '../models/AddVendor';


@Component({
  selector: 'app-selectlist',
  templateUrl: './selectlist.component.html',
  styleUrls: ['./selectlist.component.scss']
})
export class SelectlistComponent implements OnInit {

  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;

  Role: string;
  Ltype: string;
  IsActive: number;
  show: boolean = true;
  uType: string = "";
  RoleName: string = "";
  ButtonCaption: string = "";
  SelectedUIDList: Array<any> = [];
  Atype: string ="";

  IsActiveVal: number;
  navItems: NavItem[];//List Items array

  vendor: AddVendor;
  vendorList: Array<any> = [];


  dataSource: MatTableDataSource<AddVendor>;
  Dsshow:boolean ;

  displayedColumns = ['firstName', 'lastName', 'email', 'phoneNo', 'vid'];


  FNFilter = new FormControl('');
  LNFilter = new FormControl('');



  selection = new SelectionModel<AddVendor>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;



  constructor(private adminService: AdminService, private toastr: ToastrService, private route: ActivatedRoute,
    private router: Router, private navService: NavService, private commonService: CommonService) {
    //To get menu
    this.navItems = this.navService.navItems;

    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
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



  ngOnInit() {

    //This is to get Type
    this.uType = sessionStorage.getItem('UType');

    //This for side menu 
    this.navService.appDrawer = this.appDrawer;

    //This is Check Vendor / User collection
    this.Role = this.route.snapshot.params['Role'];

    //This is Check Type of List
    this.Ltype = this.route.snapshot.params['LType'];

    if (this.Role == '2') {
      this.RoleName = "Vendor's";     
    }

    if (this.Ltype == "AcV") {
      this.IsActive = 1;
      this.IsActiveVal=0;
      this.RoleName = "Active Vendor's";
      this.ButtonCaption = "DeActive Vendor (s)";
      this.Atype="Vendor (s) DeActivate";
    }
    else //if (this.Ltype=="DacV")
    {
      this.IsActive = 0;
      this.IsActiveVal=1;
      this.RoleName = "DeActive Vendor's";
      this.ButtonCaption = "Active Vendor (s)";
      this.Atype="Vendor (s) Activate";
    }
    this.getList();
  }

  getList() 
  {  
    this.adminService.GetAllVendorsByActiveStatus(this.IsActiveVal).subscribe((vdata: AddVendor[]) => {
      this.vendorList = vdata["vendordata"]["table"];
      const users = vdata["vendordata"]["table"];

      if(this.vendorList.length > 0) 
      {
        this.Dsshow = true;
      }
      else
      {
        this.Dsshow = false;
      }

      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        if (error["status"] == 401) {
          this.toastr.error("Your session expired");
          sessionStorage.clear();
          this.router.navigate(['/vendor']);
        }

      });
  }



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (!this.dataSource) { return; }
    if (this.isAllSelected()) {
      //This is for All Selection Remove
      this.selection.clear();
      this.show = true;     
      this.SelectedUIDList.splice(0,this.dataSource.data.length);
    }
    else {
      //This is for All selection 
      this.show = false;
      this.dataSource.data.forEach(data => this.selection.select(data));
    }

  }

  SelectSingle(row, event) {
    //This is for Single Selection
    if (event.checked) 
    {
      //Add Selected UID     
      this.SelectedUIDList.push(row.uid);
      this.show = false;
    }
    else if (!event.checked) {
      //Remove Deselected UID
      for (var iSLCount = 0; iSLCount < this.SelectedUIDList.length; iSLCount++) 
      {
        if (this.SelectedUIDList[iSLCount] == row.uid) 
        {
          this.SelectedUIDList.splice(iSLCount, 1);
        }
      }
    }

  }


  SelectAll(event) //Remove row
  {   
    if (event.checked) 
    {
      this.show = false;
      //This For All UID selection
      for (var iCount = 0; iCount < this.dataSource.data.length; iCount++)
      {
         this.SelectedUIDList.push(this.dataSource.data[iCount]["uid"]);
      }
    }   

  }
  

  UpdateSelection()
  { 
    this.adminService.VendorStatusUpdate(this.SelectedUIDList).subscribe(data =>
       {
         if(data["res"] == "")
         {
          this.getList(); 
          this.toastr.success( this.Atype + " Successfully","Admin");
         }
        else
        {
          this.toastr.error(data["res"] ,"Admin");
        }
      },
                
      error => {
        if (error["status"] == 401) {         
          this.toastr.error("Your session expired");
          sessionStorage.clear();
          this.router.navigate(['/vendor']);
        }     
        
    });
  }
}
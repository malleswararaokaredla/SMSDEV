import { Component, OnInit, ElementRef, VERSION, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from '../services/nav.service';
import { NavItem } from '../models/nav-item';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { Products_Category_SubCategory_List } from '../models/Products_Category_SubCategory_List';
 
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'] 
})
export class ListComponent implements OnInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;  
  
  Role:string;
  Ltype:string;

 
  navItems: NavItem[];//List Items array

  uType :string="";  
  PageName:string="";
 
  productsList:Array<any> = [];  
  show:boolean ;

  dataSource: MatTableDataSource<Products_Category_SubCategory_List>;
  IsReload:boolean = true;

  columnsToDisplay = ['pName','pcName','pscName'];
  
  pNFilter = new FormControl('');
  cNFilter = new FormControl('');
  scNFilter = new FormControl('');

  //Search
  filterValues = {
    pName: '',
    cName: '',
    scName: ''   
  };
 
  RoleName:string="";
  isInitialized:boolean;
 
  selection = new SelectionModel<Products_Category_SubCategory_List>(true, []);
    
    
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
 
  constructor(private adminService: AdminService,private toastr : ToastrService,private route:ActivatedRoute,
  private router: Router,private navService: NavService) 
  {       
    //To get menu
    this.navItems= this.navService.navItems;
      
    // // override the route reuse strategy
    // this.router.routeReuseStrategy.shouldReuseRoute = function(){
    //   return false;      
   }

//    this.router.events.subscribe((evt) => {
//       if (evt instanceof NavigationEnd) {
//          // trick the Router into believing it's last link wasn't previously loaded
//          this.router.navigated = false;
//          // if you need to scroll back to top, here is the right place
//          window.scrollTo(0, 0);
//       }
//   });

// }
  

 createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data:any, filter:string): boolean {
      let searchTerms = JSON.parse(filter);
      return data.pName.toLowerCase().indexOf(searchTerms.pName) !== -1
        && data.pcName.toString().toLowerCase().indexOf(searchTerms.pcName) !== -1
        && data.pscName.toLowerCase().indexOf(searchTerms.pscName) !== -1;
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
    
    this.getList();

    this.pNFilter.valueChanges
      .subscribe(
       pName => {
          this.filterValues.pName = pName;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    this.cNFilter.valueChanges
      .subscribe(
        pcName => {
          this.filterValues.cName = pcName;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      ) 

      this.scNFilter.valueChanges
      .subscribe(
       pscName => {
          this.filterValues.pName = pscName;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )   
  }

getList()
{       
      this.adminService.GeyAllProducts_Category_SubcategoryList().subscribe((pdata: Products_Category_SubCategory_List[])=>{       
       this.productsList = pdata["productdata"]["table"]; 
      // const list = pdata["productdata"]["table"];
       console.log(this.productsList);

       if(this.productsList.length > 0) 
      {
        this.show = true;
      }
      else
      {
        this.show = false;
      }

       this.dataSource = new MatTableDataSource(this.productsList); 

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

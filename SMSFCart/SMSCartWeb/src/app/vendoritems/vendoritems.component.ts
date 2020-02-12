import { Component, OnInit, ElementRef,ViewChild,VERSION, ViewChildren } from '@angular/core';
import { EntryService } from '../services/entry.service';
import { NavService } from '../services/nav.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NavItem } from '../models/nav-item';

import { productModel } from '../models/productModel';

//import { error } from 'util';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// MDB Angular Free
import { ModalModule, TooltipModule, PopoverModule, ButtonsModule } from 'angular-bootstrap-md';

// Forms and Reactive Forms Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
//import * as $ from 'jquery';
declare var $: any;



@Component({
  selector: 'app-vendoritems',
  templateUrl: './vendoritems.component.html',
  styleUrls: ['./vendoritems.component.scss']
})
export class VendoritemsComponent implements OnInit {

  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[];//List Items array

  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('clsbtn') clsbtn: ElementRef;
  uType: string;
  
  items: string[];
  vid: number;
  vname: string;
  products: string[];
  _values1: Array<any> = [];
  prodcategories: string[];
  prodsubcategories: string[];
  id: number;
  
  nrSelect: number;
  pcitem: number;
  psitem: number;
  vpid: number;
  vitemid: number;
  IsmodelShow: boolean = false;

 

  pdata: productModel = {
    prod_subcat_id: 0,
    vid: 0,
    PID: 0,
    prod_cat_id: 0
  }

  constructor(private entryService: EntryService, private navService: NavService, private toaster: ToastrService, private router: Router) {


    //To get menu
    this.navItems = this.navService.navVItems;  
    console.log(this.items);

  
  }

  ngOnInit() {
    //This is to get Type
    this.uType = sessionStorage.getItem('UType');

    //This for side menu 
    this.navService.appDrawer = this.appDrawer;

    //To get menu
    this.navItems = this.navService.navVItems;
    
    this.vid = Number.parseInt(sessionStorage.getItem("uid"));
    this.vname = sessionStorage.getItem("userName");
    debugger
    
    if (Number.isNaN(this.vid)) {
      debugger
      alert('Sorry..ur Session time expire?please login');
      this.router.navigateByUrl('/vendor');
    }

    this.entryService.getvendoritems(this.vid).subscribe(
      data => {
        this.items = data as string[];
        
        
          this.getproducts();
        
        if(this.items == null) {
          
          this.router.navigateByUrl('/vendoracc');
        }
       
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
    //this.openedit(this.id);
   
  }

  openedit(item) {
    
    debugger
    this.nrSelect = item.pid;
    this.pcitem = item.prod_cat_id;
    this.psitem = item.prod_subcat_id;

    sessionStorage.setItem('vpid',item.vpid);
    
    this.entryService.getpcategories(this.nrSelect).subscribe(
      data => {
        this.prodcategories = data as string[];
        if (this.prodcategories != null) {
          
          this.productcat(this.psitem);
        }
        
      }, (err: HttpErrorResponse) => {
        console.log(err)
      }
      

    );
    
   // $('#ddlpname').val(id);
  }

  productcat(pcid:any) {
    debugger
    this.entryService.getpscategories(pcid).subscribe(data => {
      this.prodsubcategories = data as string[];
    }, (err: HttpErrorResponse) => {
      console.log(err);
    }
    );
  }

  getproducts() {
    this.entryService.getproducts().subscribe(
      data => {
        this.products = data as string[];
        debugger
        var p = $('#ddlpname').val();
       
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);

      }
    );
  }
  productaccord(val:any) {
    
    
    var x = $('#ddlpname').val();
    
   
    this.entryService.getpcategories(val).subscribe(
        data => {
          this.prodcategories = data as string[];
          debugger
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);

        });
   
      
  }

  update() {
    this.ngOnInit();
    var prid = $('#btnupdate').attr('#data-id');
    var veid = this.vid;
    var pcid = $('#ddlcname').val();
    var pid = $('#ddlpname').val();
    var pscid = $('#ddlpcname').val();
    this.vpid = Number.parseInt(sessionStorage.getItem('vpid'));
    debugger
    if (veid != 0 || veid != NaN) {
      this.entryService.updateven_items(veid, this.vpid, pscid).subscribe(y => {
        this.toaster.success("items updated successfully");
      
        debugger
        this.productitems();
        sessionStorage.removeItem('vpid');
        this.closeModal();
       // this.IsmodelShow = true;
      }, error => {

        if (error['status']! = 200) {
          this.toaster.error("Updation Failed");
          sessionStorage.removeItem('vpid');
       
        }

      })
    }

    else {
      alert('sorry..session time expire?please login in');
      this.router.navigateByUrl('/vendor')
    }
    
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  productitems() {
    this.entryService.getvendoritems(this.vid).subscribe(
      data => {
        this.items = data as string[];
        this.getproducts();
        debugger
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  Delvitems(item) {
    
    $('#lblpname').html(item.pName);
    $('#lblpcname').html(item.pcName);
    $('#lblpsname').html(item.pscname);
    var id = sessionStorage.setItem('vpid', item.vpid);
    
    
  }

  delitems() {
    
  

    this.vitemid = Number.parseInt(sessionStorage.getItem('vpid'));
    this.entryService.vitemdeletion(this.vitemid).subscribe(
      data => {
        
        this.toaster.success("Items Deleted Successfully");
        this.clsbtn.nativeElement.click();
        this.productitems();
        this.closeModal();
      }, (err: Response) => {
        if (err.status === 404) {
          this.toaster.error("Deletion failed");
        }
      }) 
  }

  close() {
    debugger
    this.clsbtn.nativeElement.click();
  }

}

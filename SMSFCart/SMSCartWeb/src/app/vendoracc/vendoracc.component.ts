import { Component, OnInit, Input, ViewChild, ElementRef, VERSION } from '@angular/core';
import { EntryService } from '../services/entry.service';
import { HttpErrorResponse } from '@angular/common/http';
import { expand, debounce } from 'rxjs/operators';
import{FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn}from '@angular/forms';
import { NavItem } from '../models/nav-item';
import { NavService } from '../services/nav.service';
import { ActivatedRoute } from '@angular/router';
//import { error } from 'util';
import { Router } from '@angular/router';
import {productModel } from '../models/productModel';
//import { strictEqual } from 'assert';
//import { parse } from 'url';
declare var $:any;
import { ToastrService } from 'ngx-toastr';
import { List } from 'lodash';
import {DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-vendoracc',
  templateUrl: './vendoracc.component.html',
  styleUrls: ['./vendoracc.component.scss']
})
export class VendoraccComponent implements OnInit {
//productModel : productModel;
panelOpenState = false;
products:string[];
prodcategories:string[]; 
prodsubcategories:string[];
flag:boolean=false;
show:boolean=false;
psitmesList;
psitmes:number[];
xpandStatus=false;
Status=false;
vitems: string[];
  checkedList: Array<any> = [];
  itemdata: Array<any> = [];
  xyzlist: Array<any> = [];
  temp: Array<any> = [];

step = -1;
innerstep=-1;
subinnerstep=0;
  checkboxes: any;

  pdata: productModel = {
    prod_subcat_id: 0,
    vid: 0,
    PID: 0,
    prod_cat_id: 0
  }
    checkbox: boolean;


  setStep(index: number) {
  
  this.step = index;
    this.isetStep(-1);
 

}

  nextStep() {  
    this.step++;
  
  
}

prevStep() {
  this.step--;
 
  
}


isetStep(index: number) {
  this.innerstep = index;
  this.checkedList = [];

  sessionStorage.removeItem("chksubcategory");
  $(".chkinnacc").attr("checked", false);
  
 
}
inextStep() {
  this.innerstep++;
 
}

  iprevStep() {
  this.innerstep--;

}



  issetStep(index: number) {

    this.checkedList = [];
    this.prodsubcategories = null;
  
  sessionStorage.removeItem("chksubcategory");
    $(".chkinnacc").attr("checked", false);
   
    

} 
 
  

  isubnextStep() {
  
  this.subinnerstep++;
  sessionStorage.removeItem("chksubcategory");
  $(".chkinnacc").attr("checked", false);

  
}

isubprevStep() {
  this.subinnerstep--;
  sessionStorage.removeItem("chksubcategory");
  $(".chkinnacc").attr("checked", false);

}

  resetAll() {
    var listItems=[];
    listItems.forEach((item) => {
      item.checked = false;
    })
  }

@ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;  

  navItems: NavItem[];//List Items array
  

  uType: string = "";
  vid: number;
  token:string="";


  constructor(private entryService: EntryService, private navService: NavService, private route: ActivatedRoute, private toaster: ToastrService, private router: Router) {

    //To get menu
    this.navItems = this.navService.navVItems;

    this.entryService.bindvendors().subscribe(
      data => {
        this.vitems = data as string[];        
        this.getproducts();
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);

      }
      
    );
   


  

  }



  ngOnInit() {
    //This is to get Type
    this.uType = sessionStorage.getItem('UType'); 

    //This for side menu 
    this.navService.appDrawer = this.appDrawer;

    //To get menu
    this.navItems = this.navService.navVItems;

    this.vid = Number.parseInt(sessionStorage.getItem("uid"));
    this.token=sessionStorage.getItem('token');
   debugger
 
    if (Number.isNaN(this.vid)) {
      debugger
      this.router.navigateByUrl('/vendor');
    }
    
    
    
  }

  updateCheckedOptions(psitem, event) {
    if (event.target.checked) {
      this.checkedList.push(psitem.prod_subcat_id);
      
    } else {
      for (var i = 0; i < this.xyzlist.length; i++) {
        if (this.checkedList[i] == psitem.prod_subcat_id) {
          this.checkedList.splice(i, 1);
        }
      }
    }
    console.log(this.checkedList);
    let a = this.checkedList;
   
    sessionStorage.setItem('chksubcategory', a.toString());
   
    
  }

  getproducts() {
    this.entryService.getproducts().subscribe(
      data => {
        this.products = data as string[];
        if (this.prodsubcategories != null || this.prodcategories != null || this.products != null) {
          this.show = true;
        }
        else {
          this.show = false;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);

      }
    );
  }

  getproductitems() {

    let a = sessionStorage.getItem("chksubcategory");
    console.log(a);
  
    this.temp = a.split(",");
    
    //for (a in this.temp) {
    //  this.temp[a] = parseInt(this.temp[a], 10);
    //  this.pdata.vid = Number.parseInt(sessionStorage.getItem("uid"));
    //  this.pdata.prod_subcat_id = this.temp[a];
    //  this.itemdata.push(this.pdata);
    //  debugger
    //}


    //let element = document.getElementsByClassName('chkinnacc');
    //alert(element);

    //for (var i = 0; i < this.temp.length; i++) {
    //  debugger
    //  this.pdata.vid = Number.parseInt(sessionStorage.getItem("uid"));
    //  this.pdata.prod_subcat_id = this.temp[i];
    //  this.itemdata.push(this.pdata);
    //  debugger
    //}
    //console.log(JSON.stringify(this.itemdata));
    //this.vid = Number.parseInt(sessionStorage.getItem("uid"));
    //this.pdata.prod_subcat_id =Number.parseInt(sessionStorage.getItem(a));
    //var itemdata = new Array();
    //$.each($("input[name='chkacc']:checked"), function (key,value) {
    //  console.log(vid);  
    //  itemdata.push();
    //  console.log($(this).val())    
    //  vid = Number.parseInt(sessionStorage.getItem("uid"));

    //});
    //alert(itemdata);

    this.entryService.insertvendorvalues(this.vid,a).subscribe(x => {
      this.toaster.success("items Added Successfully");
      this.router.navigateByUrl("/vendoritems");
     
    },
      error => {
        if (error["status"] != 200) {
          this.toaster.error("Failed to adding products");

          //sessionStorage.removeItem("uid");
          //sessionStorage.removeItem("chksubcategory");
          //this.router.navigateByUrl("/vendor");
        };

        
      });
     
  }
  

  productaccord(id:number,category: string){    
    debugger
    this.ngOnInit();
    if(category === 'main'+id){
      
      this.entryService.getpcategories(id).subscribe(
        data => {
          this.prodcategories = data as string[];
          if (this.prodsubcategories != null || this.prodcategories != null || this.products != null) {           
            this.show = true;
          }
          else {
            this.show = false;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);

        });
    }

  if(category === 'sub'+id){
    debugger
    this.entryService.getpscategoriesbyvid(id,this.vid).subscribe(
    data=>{
      console.log(data);
     this.prodsubcategories=data as string[];    
    if(this.prodsubcategories!=null ||this.prodcategories!=null ||this.products!=null) 
    {  
    this.show=true;
  }
  else{
    this.show=false;
  }

  },
  (err: HttpErrorResponse) => {
    console.log (err.message);  
  });
   return this.flag;
  }
}


  

}

    
     
    


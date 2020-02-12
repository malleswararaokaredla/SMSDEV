import { Component, OnInit, ViewChild, VERSION, ElementRef } from '@angular/core';
import { NavService } from '../services/nav.service';
import { EntryService } from '../services/entry.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from 'selenium-webdriver/http';
import { NavItem } from '../models/nav-item';
import {Vendesc } from '../models/VendescModel';
import { HttpErrorResponse } from '@angular/common/http';
import { AssertNotNull } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { forEach } from '@angular/router/src/utils/collection';
import { Console } from '@angular/core/src/console';
declare var $: any;
@Component({
  selector: 'app-venitemdesc',
  templateUrl: './venitemdesc.component.html',
  styleUrls: ['./venitemdesc.component.scss']
})
export class VenitemdescComponent implements OnInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  version = VERSION;
  navItems: NavItem[];//List Items array
  venitemsize: string[];
  venitembrand: string[];
  venitemmattype: string[];
  venitemmatwork: string[];
  itemnames: string[];
  itemdes: string[];

  existingaddress: Array<any> = [];
  newAttribute: any = {};
  newitemAttribute: any = {};

  newitemdesc: Array<any> = [];

  fieldArray: Array<any> = [];
  itemArray: Array<any> = [];

  closebttn: boolean = true;
  display: boolean = false;
  isEditItems: boolean = false;

  pid: number;
  nrSelect: number;
  token: string;

  show: boolean = false;
  clothes: boolean = false;
  footwear: boolean = false;
  wearable: boolean = false;

  prodcategories: string[];

  venitemdesc: Vendesc = {

    itm_size: null,
    material_type: null ,
    itm_wtid: 0,
    worktype: null ,
    itm_id: 0,

    itm_descp: null,
    care: null,
    attached_sleeves: null,
    sleeve_Length: 0,
    sleeves_material: null,
    price: 0,
    color: null,
    product_code: null,
    shipping_charges: 0,
    offer: 0,
    bid: 0,

    //items_sid: 0,
    item_mid: 0,
    itm_sz_id: 0,
    //Bname: null,
    itm_length: null,
    quantity: 0,
    features: null,
    occasion: null,
    itm_style_type: null,
    neck_type: null,

    toe_type: null,
    heel_height:null,
    heel_type: null,
    model_no: null,
    it_name: null,
    Bname: null,
    waranty:0
  }
    vid: number;

  itmdesclist: Array<Vendesc> = [];

  constructor(private entryService: EntryService, private navService: NavService, private toaster: ToastrService, private router: Router) {
  //To get menu
    this.navItems = this.navService.navVItems;
    this.getvitemnames();
    this.addFieldValue();
    this.additemValue();
    this.getvenitemdescription();
}


  getvitemnames() {
    this.vid = Number.parseInt(sessionStorage.getItem("uid"));
   
    if (Number.isNaN(this.vid)) {
      debugger
      this.router.navigateByUrl('/vendor');
    }

   
  }

  pcshow(id:any) {
    
    this.nrSelect =id;

      this.show = true;
    
    var id = $('#ddlcname option:selected').attr('id');
    debugger
    this.entryService.vitemnames(this.vid,this.nrSelect).subscribe(
     
      data => {
        this.itemnames = data as string[];
      
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);

      });
    if (id == 10 || id == 20 || id == 50 || id == 60 || id == 70) {
      debugger
      this.clothes = true;
      this.wearable = false;
      this.footwear = false;
    }
   

    else if (id == 80 || id == 90 || id == 30) {
      debugger
      this.wearable = true;
      this.clothes = false;
      this.footwear = false;
    }
  
    else if (id == 40) {
      debugger
      this.footwear = true;
      this.wearable = false;
      this.clothes = false;
    }
    

    

  }

  getvenitemdescription() {
    debugger
    this.entryService.venitemdescription(this.vid).subscribe(data => {

      this.itemdes = data as string[];
      debugger
    
      this.vendoritemsizes();
    }, (err: HttpErrorResponse) => {
      console.log(err.message);
      })

  }

  getdesc() {
    this.entryService.venitemdescription(this.vid).subscribe(data => {

      this.itemdes = data as string[];
    }, (err: HttpErrorResponse) => {
      console.log(err.message);
    })
  }

  vendoritemsizes() {
    
    this.entryService.venitemsize().subscribe(
      data => {

        this.venitemsize = data as string[];
        debugger
         this.venitembrands();
      }, (err: HttpErrorResponse) => {
        console.log(err.message);

      });
  }
  venitembrands() {
    this.entryService.venitembrand().subscribe(data => {
      this.venitembrand = data as string[];
      
      debugger
      this.venitemmattypes();
    })
  }

  venitemmattypes() {
    this.entryService.venitemmattype().subscribe(data => {
      this.venitemmattype = data as string[];
      
      this.venmatworks();
      debugger
    })
  }
  add() {
    debugger
   // $('.block:last').before('<div class="block"><input type="text" /><span class="remove">Remove Option</span></div>');
    $('.block:last').before('<div class="block form-row"><div class="col-md-3 mb-3"> <input type="text"  name="color" #color="ngModel"  [(ngModel)]="venitemdesc.color" class="form-control" required/> </div>  <div class="col-md-3 mb-3 block">< input type = "text" name = "itmprice" #itmprice = "ngModel"[(ngModel)] = "venitemdesc.price" class="form-control" required /> </div></div>');
  }

  remove(obj) {
    debugger
    $(this).parent().remove();
  }
  venmatworks() {
    this.entryService.venitemmatwork().subscribe(data => {
      this.venitemmatwork = data as string[];
      this.productcat();
    })
  }
  ngOnInit() {
    //This for side menu 
    this.navService.appDrawer = this.appDrawer;

    //To get menu
    this.navItems = this.navService.navVItems;

    this.isEditItems = true;
    this.display = true;
    
  }

  addFieldValue() {
    debugger
    let count = 5 - this.existingaddress.length;
    if (this.fieldArray.length < count) {

      console.log(count);
           
      this.fieldArray.push(this.newAttribute);
      debugger
      this.newAttribute = {};
      if (this.fieldArray.length == 0) {
        this.closebttn = false;

      }
      else {
        this.closebttn = true;
      }
      
    } else {

    }
  }

  deleteFieldValue(index) {
    

    this.fieldArray.splice(index, 1);
    if (this.fieldArray.length <= 0) {

      debugger
    }
  }

  deleteitemValue(index) {
    this.itemArray.splice(index, 1);
    if (this.itemArray.length <= 0) {

      debugger
    }
  }


  additemValue() {
    debugger
    let count = 5 - this.existingaddress.length;
    if (this.itemArray.length < count) {

      console.log(count);

      this.itemArray.push(this.newitemAttribute);
      debugger
      this.newitemAttribute = {};
      if (this.itemArray.length == 0) {
        this.closebttn = false;

      }
      else {
        this.closebttn = true;
      }
    } else {

    }
  }

  productcat() {
    debugger
    this.entryService.getcategories().subscribe(
      data => {
        this.prodcategories = data as string[];
        debugger
        
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);

      });


  }

  save() {
    this.token = sessionStorage.getItem("token");
    debugger
    this.fieldArray.forEach((data) => {
      if (!data.hasOwnProperty("aid")) {

        
        if (data["attached_sleeves"] == undefined)
          data["attached_sleeves"] = "";

      
        if (data["bname"] == undefined)
          data["bname"] = "";

      
        if (data["care"] == undefined)
          data["care"] = "";

        if (data["color"]==undefined)
          data["color"]= "";

     
        if (data["features"] == undefined)
          data["features"] = "";

     
        if (data["heel_height"] == undefined)
          data["heel_height"] = "";

        
        if (data["heel_type"] == undefined)
          data["heel_type"] = "";

        
       
          data["itm_size"] = "";

        this.venitemdesc.itm_sz_id = Number.parseInt(data["itm_sz_id"]);
        if (Number.isNaN(data["itm_sz_id"]))
          debugger
        data["itm_sz_id"] = 0;

        
        if (data["it_name"] == undefined)
          data["it_name"] = "";


        if (Number.parseInt(data["item_mid"]) == NaN)
          data["item_mid"] = 0;

        //this.venitemdesc.itm_descp = data["itm_descp"];
        //this.venitemdesc.itm_id = Number.parseInt(data["itm_id"]);
        //this.venitemdesc.itm_length = data["itm_length"];

       
        if (data["itm_style_type"] == undefined)
          data["itm_style_type"] = "";

        //this.venitemdesc.itm_wtid = Number.parseInt(data["itm_wtid"]);

        if (data["material_type"] == undefined)
          data["material_type"] = ""

       
        if (data["model_no"]== undefined)
          data["model_no"]= "";

      
        if (data["neck_type"] == undefined)
          data["neck_type"] = "";

    
        if (data["occasion"] == undefined)
          data["occasion"] = "";

        if (Number.isNaN(Number.parseInt(data["offer"])))
          debugger
       data["offer"] = 0;

       // this.venitemdesc.price = Number.parseFloat(data["price"]);

        
        if (data["product_code"] == undefined)
          data["product_code"] = "";

        if (Number.isNaN(Number.parseInt(data["quantity"])))
          data["quantity"] = 0;

       
        if (Number.isNaN(Number.parseInt(data["shipping_charges"])))
          data["shipping_charges"] = 0;

        if (data["sleeves_material"] == undefined)
          data["sleeves_material"] = "";


        if (Number.isNaN(Number.parseInt(data["sleeve_Length"])))
          data["sleeve_Length"] = 0;

     
        if (data["sleeve_Length"] == undefined)
          data["sleeve_Length"] = "";

  

        if (data["worktype"] == undefined)
          data["worktype"] = "";

        if (Number.isNaN(Number.parseInt(data["waranty"])))
         data["waranty"]= 0;
        this.itmdesclist.push(data);
        debugger
       
     
        //data["uid"] = Number.parseInt(sessionStorage.getItem("uid"));
       


      }
    })

    this.itemArray.forEach((data)=> {
      if (!data.hasOwnProperty("aid")) {



        if (data["color"] == undefined)
          data["color"] = null;

        if (data["itm_size"] == undefined)
          data["itm_size"] = null;

        if (Number.isNaN(Number.parseInt(data["quantity"])))
          data["quantity"] = 0;



        if (Number.isNaN(Number.parseInt(data["waranty"])))
          data["waranty"] = 0;
        this.itmdesclist.push(data);
        debugger


        //data["uid"] = Number.parseInt(sessionStorage.getItem("uid"));

        

      }
      
    })

    console.log(this.newitemdesc);
    console.log(this.itmdesclist);

    if (this.token == '' || this.token == null) {
      debugger
      alert('Sorry..ur Session time expire?please login');
      this.router.navigateByUrl('/vendor');
    }
    else {
      
      this.entryService.insvenitemdes(this.itmdesclist).subscribe(data => {
        debugger
        this.toaster.success('Description Added successfully');
        this.closeBtn.nativeElement.click();
        this.getdesc();
      }, error => {
        if (error["status"] == 401) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("uid");
          this.router.navigate(['/home']);
          debugger

          this.toaster.success('Sorry..ur Session time expire?please login');
          this.closeBtn.nativeElement.click();
        }
        else {
          this.toaster.success('Description Adding Failed');
        }
      })
      debugger
    }
  }
  


}

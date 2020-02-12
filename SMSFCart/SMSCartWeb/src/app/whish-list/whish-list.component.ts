import { Component, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { Router } from '@angular/router';
import { SmsfashionapiService, NavItem } from '../services/smsfashionapi.service';
import { LoginComponent } from '../login/login.component';
import { Items } from '../models/ItemsModel';

@Component({
  selector: 'app-whish-list',
  templateUrl: './whish-list.component.html',
  styleUrls: ['./whish-list.component.scss']
})
export class WhishListComponent implements OnInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  version = VERSION;
  show: boolean = true;
  navItems: NavItem[];
  whishlistdata: Array<any> = [];
  catcount: Number;
  applog: string;
  itemsizes: Array<any> = [];
  showsizediv: number = -1;

  bagitem: Items = {
    uid: null,
    itm_id: null,
    it_name: null,
    price: null,
    cat_img: null,
    size: null,
    qunty: null,
    type: 0,
    bag_id: 0,
    status: null
  }

  constructor(private toastr: ToastrService, public dialog: MatDialog, private router: Router, private dataservice: SmsfashionapiService) {

    if (!sessionStorage.getItem("uid")) {
      this.router.navigate(['/home']);
    }


    this.applog = this.dataservice.getapplog();
    this.navItems = this.dataservice.navItems;
    this.catcount = this.dataservice.GetBagCount();
    this.getwhishlistdata();
  }


  getwhishlistdata() {
    this.dataservice.GetWishListdata(Number.parseInt(sessionStorage.getItem("uid"))).subscribe(x => {
     
      this.whishlistdata = x["res"]["table"];
    },
      error => {
        if (error["status"] != 200) {
          this.toastr.error("session expired");

          this.router.navigate(['/logout']);
        }
      }
    );
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataservice.appDrawer = this.appDrawer;
  }
  openorderspage() {
    if (sessionStorage.getItem("uid")) {
      this.router.navigateByUrl("/usersettings/orders");
    }
  }
  prifilepage() {

    if (sessionStorage.getItem("uid")) {
      this.router.navigateByUrl("/usersettings/editprofile");
    }
  }


  logout() {
    this.router.navigate(['/logout']);
  }
  viewbag(): void {
    if (this.catcount > 0) {
      this.router.navigateByUrl("/itembag");
    }
    else {
      this.toastr.info("No Itemes In Your Cart", "Bag", { timeOut: 3000, positionClass: 'toast-top-right' });
    }
  }

  whishlist() {

    if (sessionStorage.getItem("uid")) {
      this.router.navigateByUrl("/whishlist");
    }    
  }

  openMyMenu() {
    //this.trigger.openMenu();
    if (!sessionStorage.getItem("token")) {
      this.dialog.open(LoginComponent);
    }
    else if (sessionStorage.getItem("token")) {

      this.trigger.openMenu();
    }

  }

  Movetobag(item,i) {
   
    if (this.bagitem.size == null) {
      this.getitemsizefromapi(item, i);
    }
    else {
      this.bagitem.uid = item["uid"];
      this.bagitem.itm_id = item["itm_id"];
      this.bagitem.price = item["price"];
      this.bagitem.qunty = 1;
      this.bagitem.bag_id = item["wh_id"];
  

      this.dataservice.AddingItemsToBag(this.bagitem).subscribe(x => {

        this.toastr.success(x["res"], 'BAG', {
          timeOut: 3000, positionClass: 'toast-top-right'
        });
        const index: number = this.whishlistdata.indexOf(item);
        if (index !== -1) {
          this.whishlistdata.splice(index, 1);
        }
        this.LoadBagItems();
        this.RemoveItemFromWhishList(this.bagitem);
      },
        error => {
          if (error["status"] != 200) {

            this.toastr.error("Your Session Exipired");

            this.router.navigate(['/logout']);
          }

        });
    }

    
  }
  getitemsize(size) {  
   
   // this.addtobagitems.size = size;
    this.toastr.info('UR Selected Size  ' + size, 'SIZE', {
      timeOut: 2000, positionClass: 'toast-top-right'
    });
    this.bagitem.size = size;
    this.showsizediv = -1;
  }


  getitemsizefromapi(item,i) {
    this.dataservice.GetItemSizeInfo(Number.parseInt(item["itm_id"])).subscribe(data => {

    
      this.itemsizes = data["res"]["table"];
      this.showsizediv = i;
    })
  }
  LoadBagItems() {
    if (sessionStorage.getItem("uid")) {
      this.dataservice.GetBagItemsDetailsById(Number.parseInt(sessionStorage.getItem("uid"))).subscribe(x => {
        this.dataservice.bagiformationbyid = x["res"]["table"];
      },
        error => {
          if (error["status"] != 200) {

            this.toastr.error("Your Session Exipired");

            this.router.navigate(['/logout']);
          }

        });
    }
  }

  RemoveItemFromWhishList(item) {
     this.dataservice.RemoveItem_whishList(item).subscribe(x => { console.log(x) });
  }


  deleteitemfromwhishlist(index) {
   
    this.bagitem.bag_id = this.whishlistdata[index]["wh_id"];
    this.bagitem.itm_id = 0;
    this.bagitem.price = 0;
    this.bagitem.qunty = 0;
    this.bagitem.uid = 0;

   

    this.dataservice.RemoveItem_whishList(this.bagitem).subscribe(x => {
      this.toastr.success("Item Removed " + x["res"]);
      this.getwhishlistdata();
    },
      error => {
        if (error["status"] != 200) {

          this.toastr.error("Your Session Exipired");

          this.router.navigate(['/logout']);
        }

      });


  }
}

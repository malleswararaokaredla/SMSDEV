import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { Router } from '@angular/router';
import { SmsfashionapiService, NavItem } from '../services/smsfashionapi.service';
import { LoginComponent } from '../login/login.component';
import { Items } from '../models/ItemsModel';

@Component({
  selector: 'app-add-to-bag',
  templateUrl: './add-to-bag.component.html',
  styleUrls: ['./add-to-bag.component.scss']
})
export class AddToBagComponent implements OnInit {
  show: boolean = true;
  navItems: NavItem[];
  BagItems: Array<any>=[];
  count: number=0;
  totalprice: number = 0;
  shpngchrgs: number=0;
  totalamount: number = 0;
  localbagitems: Array<any> = [];
  catcount: number;
  quntysequnc: Array<number> = [];
  sizes: Array<any> = ['XS', 'S', 'M', 'L', 'XL'];

  addtobagitems: Items = {
    uid: 0,
    itm_id: 0,
    it_name: null,
    price: 0,
    cat_img: null,
    size: null,
    qunty: 0,
    bag_id: 0,
    type: 0,
    status: null
  }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  constructor(private toastr: ToastrService, public dialog: MatDialog, private router: Router, private dataservice: SmsfashionapiService) {
    this.navItems = this.dataservice.navItems;

    for(let i = 1; i <= 10; i++) {
      this.quntysequnc.push(i)
    }
   
  }

  ngOnInit() {
  

    if (sessionStorage.getItem("uid") == null) {

      if (Number.parseInt(localStorage.getItem("unknownuserBAG").length.toString()) > 0) {
       
        this.BagItems = JSON.parse(localStorage.getItem("unknownuserBAG"));
        this.count = this.BagItems.length;
        //localStorage.removeItem("unknownuserBAG");
        //localStorage.setItem("unknownuserBAG", JSON.stringify(this.BagItems));

      }
      else {
       // this.count = 0;
      }


    }
    else {
     
      if (localStorage.getItem("unknownuserBAG") != null) {
     
        if (Number.parseInt(localStorage.getItem("unknownuserBAG").length.toString()) > 0) {

          if (Number.parseInt(this.dataservice.bagiformationbyid.length.toString()) != 0) {
            this.BagItems = this.dataservice.bagiformationbyid;
          }


          this.localbagitems = JSON.parse(localStorage.getItem("unknownuserBAG"));

          this.addtobagitems.uid = (Number.parseInt(sessionStorage.getItem("uid")));
        
          this.localbagitems.forEach((data) => {
            this.BagItems.push(data);
            this.addtobagitems.itm_id = data["itm_id"];
            this.addtobagitems.price = data["price"];
            this.addtobagitems.qunty = data["qunty"];
            this.addtobagitems.size = data["size"];


            this.dataservice.AddingItemsToBag(this.addtobagitems).subscribe(x => {

            
              //this.toastr.success(x["res"], 'BAG', {
              //  timeOut: 3000, positionClass: 'toast-top-right'
              //});
            });

           this.count = this.BagItems.length;
          });
          localStorage.removeItem("unknownuserBAG");
          localStorage.removeItem("bagcount");
        }
      }
      else {
       
       
        if (Number.parseInt(this.dataservice.bagiformationbyid.length.toString()) != 0) {
          this.BagItems = this.dataservice.bagiformationbyid;
        }
          //this.localbagitems = JSON.parse(localStorage.getItem("unknownuserBAG"));

          //this.addtobagitems.uid = (Number.parseInt(sessionStorage.getItem("uid")));
          //console.log("forEach2");
          //this.localbagitems.forEach((data) => {
          //  this.BagItems.push(data);
          //  this.addtobagitems.itm_id = data["itm_id"];
          //  this.addtobagitems.price = data["price"];
          //  this.addtobagitems.qunty = data["qunty"];
          //  this.addtobagitems.size = data["size"];


          //  this.dataservice.AddingItemsToBag(this.addtobagitems).subscribe(x => {

          //    console.log(x);
          //    //this.toastr.success(x["res"], 'BAG', {
          //    //  timeOut: 3000, positionClass: 'toast-top-right'
          //    //});
          //  });

           
          //});

        this.count = this.dataservice.bagiformationbyid.length;

        }
      //else {
      //  this.BagItems = this.dataservice.bagiformationbyid;
      //  this.count = this.dataservice.bagiformationbyid.length;
      //}
      //else {
      //  console.log(this.dataservice.bagiformationbyid);
      //  this.BagItems = this.dataservice.bagiformationbyid;
      //  this.count = this.dataservice.bagiformationbyid.length;
      //}
      //console.log(this.dataservice.bagiformationbyid);
      //this.BagItems = this.dataservice.bagiformationbyid;
      //this.count = this.dataservice.bagiformationbyid.length;


    }

    if (this.BagItems.length > 0) {
     
      this.BagItems.forEach((data) => {
        this.totalprice = this.totalprice + Number.parseInt(data["price"]);
      });
      this.totalamount = this.totalprice + this.shpngchrgs;
      sessionStorage.setItem("totalprice", this.totalprice.toString());
      sessionStorage.setItem("totalamount", this.totalamount.toString());
      sessionStorage.setItem("shpngchrgs", this.shpngchrgs.toString());
    }
  

  }
  userprofile() {

    if (!sessionStorage.getItem("token")) {
      this.dialog.open(LoginComponent);
    }
    else {

      this.show = false;
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

  movetowishlist(item) {
   // console.log(item);
    this.addtobagitems.uid = Number.parseInt(sessionStorage.getItem("uid"));
    this.addtobagitems.itm_id = item["itm_id"];
    this.addtobagitems.bag_id = item["bag_id"];
    this.addtobagitems.price = item["price"];
    this.addtobagitems.qunty = item["qunty"];
    this.addtobagitems.type = 1; //for move to whish list

    this.dataservice.Comm_Service_Movetowhishlist_Remove(this.addtobagitems).subscribe(x => {
   //   console.log(x)

      if (x["res"] = "Successfull") {
        this.toastr.info("Item Added to Whish List", "WhishList", { timeOut: 3000, positionClass: 'toast-top-right' });
        const index: number = this.BagItems.indexOf(item);
        if (index !== -1) {
          this.BagItems.splice(index, 1);
        }   
       
      }
    },
      error => {

        if (error["status"] != 200) {
          
          this.toastr.error("Your Session Exipired");

          this.router.navigate(['/logout']);
        }
      }

    );
  }

  RemoveFromBag(item) {
    this.addtobagitems.uid = Number.parseInt(sessionStorage.getItem("uid"));
    this.addtobagitems.itm_id = item["itm_id"];
    this.addtobagitems.bag_id = item["bag_id"];
    this.addtobagitems.price = item["price"];
    this.addtobagitems.qunty = item["qunty"];
    this.addtobagitems.type = 2; //for remove
   
    if (sessionStorage.getItem('uid') == null) {
    
      const index: number = this.BagItems.indexOf(item);
      if (index !== -1) {
        this.BagItems.splice(index, 1);

        this.totalprice = this.totalprice - Number.parseInt(item["price"]);
        this.totalamount = this.totalamount - Number.parseInt(item["price"]);
        localStorage.removeItem("unknownuserBAG");

        localStorage.setItem("unknownuserBAG", JSON.stringify(this.BagItems));
      }
      this.count = this.count - 1;
      this.catcount = this.dataservice.bagcount;
      this.catcount = this.catcount = 1;
      this.dataservice.bagcount = this.catcount;
      this.dataservice.UnknownUserBagData.splice(index, 1);
    }
    else {

  
    this.dataservice.Comm_Service_Movetowhishlist_Remove(this.addtobagitems).subscribe(x => {
      //   console.log(x)

      if (x["res"] = "Successfull") {
        this.toastr.info("Removed Item From Bag", "BAG", { timeOut: 3000, positionClass: 'toast-top-right' });
        const index: number = this.BagItems.indexOf(item);
        if (index !== -1) {
          this.BagItems.splice(index, 1);
        }
        this.count = this.count - 1;

        this.dataservice.bagcount = this.dataservice.bagcount - 1;

      }
    },
      error => {

        if (error["status"] != 200) {

          this.toastr.error("Your Session Exipired");

          this.router.navigate(['/logout']);
        }
      }

    );
    }
  }


  checkout() {

       if (sessionStorage.getItem("uid") == null || sessionStorage.getItem("uid") == 'undefined') {
      const dialog = this.dialog.open(LoginComponent);
      dialog.afterClosed().subscribe(async () => {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
          return false;
        };

        await delay(300);
        this.ngOnInit();
      });

    }

    else {
      this.router.navigate(['/checkout']);
    }
    //else {
    //  if (Number.parseInt(localStorage.getItem("unknownuserBAG").length.toString()) > 0) {
    //    console.log(localStorage.getItem("unknownuserBAG"));

    //    console.log(this.BagItems);

    //    this.addtobagitems.uid = (Number.parseInt(sessionStorage.getItem("uid")));

    //    this.BagItems.forEach((data) => {

    //      this.addtobagitems.itm_id = data["itm_id"];
    //      this.addtobagitems.price = data["price"];
    //      this.addtobagitems.qunty = data["qunty"];
    //      this.addtobagitems.size = data["size"];


    //      this.dataservice.AddingItemsToBag(this.addtobagitems).subscribe(x => {

    //        console.log(x);
    //        //this.toastr.success(x["res"], 'BAG', {
    //        //  timeOut: 3000, positionClass: 'toast-top-right'
    //        //});
    //      });

    //      this.count = this.BagItems.length;
    //    });
    //    //localStorage.removeItem("unknownuserBAG");
    //    //localStorage.removeItem("bagcount");

    //    //this.dataservice.bagiformationbyid = this.BagItems;



    //    //this.router.navigate(['/checkout']);
    //  }
    //  else {
    //    this.dataservice.bagiformationbyid = this.BagItems;
    //    this.router.navigate(['/checkout']);
    //  }

    // // this.toastr.error("Plz Login for Checkout", "Login", { timeOut: 2000, positionClass: 'toast-top-right' });
    //}

  }
  getquntyvalue(qty, i) {
    this.totalprice = 0;
    this.totalamount=0;
  
    this.BagItems[i]["qunty"] = qty;

      this.BagItems.forEach((data) => {
        this.totalprice = this.totalprice + Number.parseInt(data["price"]);
    
      });
      this.totalamount = this.totalprice + this.shpngchrgs;
      sessionStorage.setItem("totalprice", this.totalprice.toString());
      sessionStorage.setItem("totalamount", this.totalamount.toString());
      sessionStorage.setItem("shpngchrgs", this.shpngchrgs.toString());


    this.BagItems[i]["price"] = Number.parseInt(qty) * Number.parseInt(this.BagItems[i]["priceforsingle"]);
    this.addtobagitems.bag_id = Number.parseInt(this.BagItems[i]["bag_id"]);
    this.addtobagitems.qunty = Number.parseInt(this.BagItems[i]["qunty"]);
    this.addtobagitems.size = this.BagItems[i]["size"];
    this.addtobagitems.type = 1;
    this.addtobagitems.itm_id = 0;
    this.addtobagitems.price = Number.parseInt(this.BagItems[i]["priceforsingle"]) * Number.parseInt(this.BagItems[i]["qunty"]);
    this.addtobagitems.uid = 0;
   
    this.dataservice.UpdateBagDetails(this.addtobagitems).subscribe(data => { console.log(data); });
  }
  getsizevalue(sz, i) {
  
    this.BagItems[i]["size"] = sz;

    this.addtobagitems.bag_id = Number.parseInt(this.BagItems[i]["bag_id"]);
    this.addtobagitems.qunty = Number.parseInt(this.BagItems[i]["qunty"]);
    this.addtobagitems.size = this.BagItems[i]["size"];
    this.addtobagitems.type = 2;
    this.addtobagitems.itm_id = 0;
    this.addtobagitems.price = 0;
    this.addtobagitems.uid = 0;
    
    this.dataservice.UpdateBagDetails(this.addtobagitems).subscribe(data => { console.log(data); });
  }

}
async function delay(ms: number) {
  
  return new Promise(resolve => setTimeout(resolve, ms));
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NavItem, SmsfashionapiService } from '../services/smsfashionapi.service';
import { tick } from '@angular/core/src/render3';
import { Items } from '../models/ItemsModel';

@Component({
  selector: 'app-item-descp',
  templateUrl: './item-descp.component.html',
  styleUrls: ['./item-descp.component.scss']
})
export class ItemDescpComponent implements OnInit {
  show: boolean = true;
  navItems: NavItem[];
  itemdetails: Array<any> = [];
  imgcmstringdata: string = null;
  itemscatlog: Array<any> = [];
  itemsizes: Array<any> = [];
  bntStyle: string;
  btndisbl: boolean = false;

  catcount: number;
  //itemspage: string = "/kurtis/Kurtas and Suits/''";
  itemspage: string;
  url: string;

  addtobagitems: Items = {
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

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  constructor(private toastr: ToastrService, public dialog: MatDialog, private router: Router, private dataservice: SmsfashionapiService, route: ActivatedRoute) {
    this.navItems = this.dataservice.navItems;


    this.itemspage ="/kurtis/"+ route.snapshot.params['url']+'/'+"''"+'/'+"''";


    this.dataservice.GetItemDataByid().subscribe(x => { /*console.log(x["res"]["table"])*/
     
      this.itemdetails = x["res"]["table"];
   
      this.itemscatlog = x["imagecatlogs"];
      this.itemsizes = x["res"]["table1"];

      //this.itemdetails.forEach((data) => {      
      //  this.imgcmstringdata = data["images"];

      //  this.itemscatlog = this.imgcmstringdata.split("data:image/png;base64,/");
      //  console.log(this.itemscatlog.length);
      //});

    });

    //this.itemscatlog = [
    //  { img: 'assets/MyImages/tops/topware.jpg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/tops/topware.jpg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/tops/topware.jpg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/tops/topware.jpg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/tops/topware.jpg', name: 'Blue Printed Kurta', price: 1200 },

    //];

    this.catcount = this.dataservice.GetBagCount();

    this.bntStyle = 'btn-default';
  }

  ngOnInit() {
  }
  userprofile() {

    if (!sessionStorage.getItem("token")) {
      this.dialog.open(LoginComponent);
    }
    else {

      this.show = false;
    }
  }
  openorderspage() {
    if (sessionStorage.getItem("uid")) {
      this.router.navigateByUrl("/usersettings/orders");
    }
  }
  logout() {
    this.router.navigate(['/logout']);
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

  prifilepage() {
    if (sessionStorage.getItem("uid")) {
      this.router.navigateByUrl("/usersettings/editprofile");
    }
  }
  getitemsize(size) {
    this.btndisbl = true;
  
    this.addtobagitems.size = size;
    this.toastr.info('UR Selected Size  ' + size, 'SIZE', {
      timeOut: 2000, positionClass: 'toast-top-right'
    });
  }

  AddtoBag(index) {

    if (this.addtobagitems.size == null) {
      this.toastr.error('Please Select Size', 'Size', {
        timeOut: 2000, positionClass: 'toast-top-right'
      });
    }
    else {


      this.addtobagitems.itm_id = this.itemdetails[index]["itm_id"];
      this.addtobagitems.price = this.itemdetails[index]["price"];
      this.addtobagitems.qunty = 1;

      if (sessionStorage.getItem("uid") == null) {

        this.addtobagitems.cat_img = this.itemdetails[index]["cat_img"];
        this.addtobagitems.it_name = this.itemdetails[index]["itm_descp"];
        this.dataservice.UnknownUserBagData.push(this.addtobagitems);

        localStorage.setItem("unknownuserBAG", JSON.stringify(this.dataservice.UnknownUserBagData));
        this.dataservice.bagcount = this.dataservice.bagcount + 1;


        localStorage.setItem("bagcount", this.dataservice.bagcount.toString());
        this.toastr.success('Added To Bag', 'BAG', {
          timeOut: 3000, positionClass: 'toast-top-right'
        });
       
        this.catcount = this.dataservice.bagcount;
        //else {

        //  sessionStorage.setItem("unknownuserBAG", this.UnknownUserData.toString());
        //}


      }
      else {
        this.addtobagitems.uid = Number.parseInt(sessionStorage.getItem("uid"));
  
        this.dataservice.AddingItemsToBag(this.addtobagitems).subscribe(x => {

          this.toastr.success(x["res"], 'BAG', {
            timeOut: 3000, positionClass: 'toast-top-right'
          });
          this.LaodBagItems();
        },
          error => {

            if (error["status"] != 200) {

              this.toastr.error("Your Session Exipired");

              this.router.navigate(['/logout']);
            }
          });
      }
    }
    
   
  }
  viewbag(): void {
    if (this.catcount > 0) {
      this.router.navigateByUrl("/itembag");
    }
    else {
      this.toastr.info("No Itemes In Your Cart", "Bag", { timeOut: 3000, positionClass: 'toast-top-right' });
    }
  }

  LaodBagItems() {
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
  whishlist() {
    if (sessionStorage.getItem("uid")) {
      this.router.navigateByUrl("/whishlist");
    }
  }

  movetowishlist(item) {

    this.addtobagitems.uid = Number.parseInt(sessionStorage.getItem("uid"));
    this.addtobagitems.itm_id = item["itm_id"];
    //this.addtobagitems.bag_id = item["bag_id"];
    this.addtobagitems.type = 3; //for move to whish list
    this.addtobagitems.price = 0;
    this.addtobagitems.qunty = 0;
    this.dataservice.Comm_Service_Movetowhishlist_Remove(this.addtobagitems).subscribe(x => {
      //   console.log(x)

      if (x["res"] = "Successfull") {
        this.toastr.success("Item Added to Whish List", "WhishList", { timeOut: 3000, positionClass: 'toast-top-right' });       
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

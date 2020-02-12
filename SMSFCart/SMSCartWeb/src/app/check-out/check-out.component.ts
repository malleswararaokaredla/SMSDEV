import { Component, OnInit } from '@angular/core';
import { SmsfashionapiService } from '../services/smsfashionapi.service';
import { Address } from '../models/AddressModel';
import { OrdersModel } from '../models/Orders';
import { MatTabChangeEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  addresslist: Array<any> = [];
  name: string;
  selectedaddress: string;
  newaddrsdiv: boolean = true;
  totalprice: number = 0;
  totalamount: number = 0;
  shpngchrgs: number = 0;
  phone: number;

  BagItems: Array<any> = [];
  adrs: Address = {
    aid: null,
    uid: null,
    address: null,
    town: null,
    city: null,
    pincode: null,
    state: null,
    type: null,
    avaldays: null,
    time: null,
  }

  ordersdata: OrdersModel = {

    ord_id: 0,
    aid: null,
    uid: null,
    phone: null,
    itm_id: null,
    ord_date: "",
    ord_status: "",
    payment_mode: null,
    expe_dvy_date: "",
    actl_dvy: "",
    amount: null,
    shipping_charges: null,
    Total_amount: null,
    cardno: "",
    cardname: "",
    expmonth: 0,
    expyear: 0,
    cvv: 0
  }
  constructor(private dataservice: SmsfashionapiService, private toastr: ToastrService, private router: Router) {


    if (sessionStorage.getItem("userName")) {

      this.name = sessionStorage.getItem("userName");
      this.phone = Number.parseInt(sessionStorage.getItem("phone"));
    }
  
    this.dataservice.GetUserAddressDetailsById(Number.parseInt(sessionStorage.getItem("uid"))).subscribe((data: Address[]) => {


      this.addresslist = data;
     
    },
      error => {

        if (error["status"] != 200) {

          this.toastr.error("Your Session Exipired");

          this.router.navigate(['/logout']);
        }
      }


    );
    this.totalprice = Number.parseInt(sessionStorage.getItem("totalprice"));
    this.totalamount = Number.parseInt(sessionStorage.getItem("totalamount"));
    this.shpngchrgs = Number.parseInt(sessionStorage.getItem("shpngchrgs"));
 }

  ngOnInit() {
  }

  newaddress() {
    this.newaddrsdiv = false;
  }
  deletedymicaddrs() {
    this.newaddrsdiv = true;
  }

  addorder(i) {
    //console.log(this.addresslist[i]);
    this.ordersdata.uid = Number.parseInt(sessionStorage.getItem("uid"));

    if (this.ordersdata.aid == null) {
      this.ordersdata.aid = this.addresslist[0]["aid"];
     
    }
   
    this.ordersdata.amount = this.totalprice;
    this.ordersdata.shipping_charges = this.shpngchrgs;
    this.ordersdata.Total_amount = this.totalamount;
    this.ordersdata.payment_mode = "COD";
    this.ordersdata.phone = sessionStorage.getItem("phone");

   // this.dataservice.SaveOrders(this.ordersdata)

    this.BagItems = this.dataservice.bagiformationbyid;

    this.BagItems.forEach((data) => {
      this.ordersdata.itm_id = this.ordersdata.itm_id + data["itm_id"] + ",";

    })
 

    this.dataservice.SaveOrders(this.ordersdata).subscribe(data => {

     
      this.toastr.success(data["res"], "Orderes", { timeOut: 3000, positionClass: 'toast-top-right' });
      this.router.navigate(['/usersettings/orders']);
     
    },
      error => {

        if (error["status"] != 200) {

          this.toastr.error("Your Session Exipired");

          this.router.navigate(['/logout']);
        }
      }


    );
  }
  getselectedaddress(i) {
   
    this.ordersdata.aid = this.addresslist[i]["aid"];
  }

  //onLinkClick(event: MatTabChangeEvent) {
  //  console.log('event => ', event);
  //  console.log('index => ', event.index);
  //  console.log('tab => ', event.tab);

   
  //}
  }

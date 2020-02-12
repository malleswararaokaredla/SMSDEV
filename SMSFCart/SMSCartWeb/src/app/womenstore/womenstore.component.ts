import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { ModalDirective } from 'angular-bootstrap-md';
import { SmsfashionapiService } from '../services/smsfashionapi.service';


@Component({
  selector: 'app-womenstore',
  templateUrl: './womenstore.component.html',
  styleUrls: ['./womenstore.component.scss']
})
export class WomenstoreComponent implements OnInit {
  @ViewChild('basicModal') public showModalOnClick: ModalDirective;

  productid: number;

  applog: string;
  womenscatgrytypes: Array<any> = [];

  wmnoffers: Array<any> = [];
  brands: Array<any> = [];
  womencatgcatlog: string;;
womencatgcatlog2: string;
  womencatgcatlog3: string;

  catcount: number;

  allprodtsdatawithsubcatgry: Array<any> = [];

  cartclients: Array<any> = [];

  constructor(private router: Router, private toastr: ToastrService, public dialog: MatDialog, private dataservice: SmsfashionapiService,
    route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.productid = Number.parseInt(route.snapshot.params['id']);
      
    this.dataservice.GetallProductsWithSubCatdata(this.productid).subscribe(data => {
      this.allprodtsdatawithsubcatgry = data["res"]["table"];
      
     this.getallbrandsdata();
    });
   
    //console.log(route.snapshot.params['id']);
    this.applog = this.dataservice.getapplog();
    if (route.snapshot.params['name'] == 'Women') {
      this.womenscatgrytypes = this.dataservice.womencatgrytypeimags;
    }
    else if (route.snapshot.params['name'] == 'Men') {
      this.womenscatgrytypes = this.dataservice.mencatgrytypeimags;
    }
  
   
    this.wmnoffers = this.dataservice.offers;
   
   // this.brands = this.dataservice.brands;
    this.cartclients = this.dataservice.cartclients;

   
    this.womencatgcatlog = "assets/MyImages/Kurtis/kurtistypesicon.jpeg";
    this.womencatgcatlog2 = "assets/MyImages/sarees/catsarees.jpg";
    this.womencatgcatlog3 = "assets/MyImages/tops/topware3.jpeg";
    //this.womenscatgrytypes = [
    //  { img: 'assets / MyImages / Kurtis / kurtistypesicon.jpeg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/sarees/catsarees.jpg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/tops/topware3.jpeg', name: 'Blue Printed Kurta', price: 1200 },
    // // assets / MyImages / Kurtis / kurtistypesicon.jpeg
    //];


   // this.dataservice.GetMainLogo().subscribe(x => { console.log(x) })

    if (sessionStorage.length > 1) {
      this.catcount = this.dataservice.GetBagCount();
      if (sessionStorage.getItem("uid")) {
      

        this.toastr.success("Hello   " + sessionStorage.getItem("userName"), "Welcome To Fashion", { timeOut: 1000, positionClass: 'toast-top-right' });
      }
     // console.log(this.dataservice.GetBagCount());
       
    }
    else {
      this.catcount = this.dataservice.GetBagCount();
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userName");
      sessionStorage.removeItem("uid");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("expiration");
    
     
    }

  }




  ngOnInit() {
   
  }
  kurtasList(name) {

    // this.router.navigate(['/kurtis', name]);
    this.router.navigate(['/kurtis', name, "", ""]);
    //this.allprodtsdatawithsubcatgry.forEach((data) => {

    //  if ((data["pscname"]) == id) {      
    //    this.router.navigate(['/kurtis', data["prod_subcat_id"],'']);
    //  }
    //})       
  }
  userprofile() {

    //if (!sessionStorage.getItem("token")) {
    // this.dialog.open(LoginComponent);
    //}
    //else {    
    //}
  }

  viewbag(): void {
    if (this.catcount > 0) {

      this.router.navigateByUrl("/itembag");
    }
    else {
      this.toastr.info("No Itemes In Your Cart", "Bag", { timeOut: 1000, positionClass: 'toast-top-right'});
    }
  }


  getbrandsProducts(name) {

    this.router.navigate(['/kurtis', "", "", name]);


 //   this.router.navigate(["brandswiseitems", name])

  }

  getallbrandsdata() {
    this.dataservice.Getallbrandsdata().subscribe(data => {
      
      this.brands = data["res"]["table"];
    });
  }
}



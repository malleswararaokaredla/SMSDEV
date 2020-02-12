import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavItem, SmsfashionapiService } from '../services/smsfashionapi.service';
import { EntryService } from '../services/entry.service';
import { CommonService } from '../services/common.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loginsts: boolean = false;

  productslist: Array<any> = [];
  constructor(public dialog: MatDialog, private router: Router, private toastr: ToastrService, 
    private dataservice: SmsfashionapiService, private entysrvice: EntryService,
    private commonService: CommonService) {
    this.dataservice.getproducts().subscribe(data => {

      this.productslist = data["res"];
 

      this.GetAllProductswithcatgdata();
      if (sessionStorage.getItem("uid")) {
        this.BagInfomation();
      }

    });


   
  
  }

  ngOnInit() { 
  }

  loginmodel() {
     if (sessionStorage.getItem("token")) {
      this.router.navigateByUrl('/home');
      this.loginsts = true;
      this.toastr.success("Hello   " + sessionStorage.getItem("userName"), "Welcome To Fashion");
      this.BagInfomation();

    }
    else {
      this.loginsts = false;
      this.dialog.open(LoginComponent);    }

   
  }
 

  //womenstore(id) {
  //    this.router.navigate(['/womenstore', id,'women']);
  //}
  //menstore(id) {
  //  this.router.navigate(['/womenstore', id, 'men']);
  //}
  //kidstore(id) {
  //  this.router.navigate(['/womenstore', id, 'kid']);
  //}


  loadstorebyproduct(id, product_type) {
    this.router.navigate(['/womenstore', id, product_type]);
  }
  vendordata()
  {
    if (!sessionStorage.getItem("token"))
    {
      this.router.navigateByUrl('/vendor');
    }
    else{
      this.router.navigateByUrl('/welcome');
    }
   
  }


  BagInfomation() {
    this.dataservice.GetBagItemsDetailsById(Number.parseInt(sessionStorage.getItem("uid"))).subscribe(x => {
      this.dataservice.bagiformationbyid = x["res"]["table"];
    });
  }

  GetAllProductswithcatgdata() {
    this.dataservice.GetallProductsWithCatdata().subscribe(data => {

      localStorage.setItem("productsinfo", JSON.stringify(data["res"]["table"]));
    }

    );
  }
}

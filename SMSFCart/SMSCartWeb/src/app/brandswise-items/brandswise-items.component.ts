import { Component, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SmsfashionapiService, NavItem } from '../services/smsfashionapi.service';
import { MatMenuTrigger, MatDialog } from '@angular/material';
import { PlatformLocation } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-brandswise-items',
  templateUrl: './brandswise-items.component.html',
  styleUrls: ['./brandswise-items.component.scss']
})
export class BrandswiseItemsComponent implements OnInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  version = VERSION;
  show: boolean = true;
  navItems: NavItem[];
  items: Array<any> = [];
  catcount: Number;
  applog: string;
  namr: string;
  subpid: number;
 

  constructor(route: ActivatedRoute, private dataservice: SmsfashionapiService,private router: Router, public dialog: MatDialog,
    private platformLocation: PlatformLocation, private toastr: ToastrService, ) {
    this.namr = (route.snapshot.params['name']);
    this.dataservice.Getbrandsdatabyname(this.namr).subscribe(data => {
      this.items = data["res"]["table"];
      console.log(data);
    })
    
    this.applog = this.dataservice.getapplog();
    this.navItems = this.dataservice.navItems;
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.dataservice.appDrawer = this.appDrawer;
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
  openorderspage() {

    this.router.navigateByUrl("/usersettings/orders");
  }
  prifilepage() {
    this.router.navigateByUrl("/usersettings/editprofile");
  }

  logout() {
    this.router.navigate(['/logout']);
  }

  displayitemdesc(id) {

    this.dataservice.item_id = Number.parseInt(id);
    this.router.navigate(['/itemdesc']);
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
    this.router.navigateByUrl("/whishlist");
  }
}

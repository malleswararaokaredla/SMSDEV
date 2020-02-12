import { Component, OnInit, ViewEncapsulation, VERSION, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { NavService } from '../services/nav.service';
import { NavItem } from '../models/nav-item';
import { Nav_VItem } from '../models/Nav_VItem';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({

  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class WelcomeComponent implements AfterViewInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  navItems: NavItem[];
  navVitems: Nav_VItem[];
  Role: string;
  show: boolean = true;
 

  constructor(private navService: NavService, private router: Router, private commonService: CommonService) {
    //commonService.IsAVLoginedIn();

    this.Role = sessionStorage.getItem("UType");
     debugger
    
    if (this.Role == "Admin") {
      debugger
      this.navVitems = this.navService.navItems;
      console.log(this.navItems);
      this.show = false;
    }
    if (this.Role == "Vendor") {
      debugger
      this.navVitems = this.navService.navVItems;
      this.show = false;
    }
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
    debugger
  }
}

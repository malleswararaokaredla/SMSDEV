import { Component, OnInit, ViewChild } from '@angular/core';
import {NavService} from '../services/nav.service';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})

export class TopNavComponent implements OnInit { 

  uType :string;  

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;  

  constructor(public navService: NavService,private router : Router,private commonService: CommonService) {
    
   }


  ngOnInit() {  
    this.uType = sessionStorage.getItem('UType'); 
  }

   Logout()
    {  
      this.commonService.AVLogout();
    }

  openMyMenu() {  

    if (!sessionStorage.getItem("token")) {  
      this.router.navigate(['vendor']);  
    }
    else if (sessionStorage.getItem("token")) {

      this.trigger.openMenu();
    }   
    
  } 
  closeMyMenu()
  {
    this.trigger.closeMenu();
  }
  
  EditProfile()
  {
    var Role = sessionStorage.getItem("UType");    
    this.router.navigate(['/Eprofile/'+ Role ]);
  }
}

import { EventEmitter, Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NavItem } from '../models/nav-item';
import { Nav_VItem } from '../models/Nav_VItem';

@Injectable()
export class NavService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);

  Role: string;

  constructor(private router: Router) {
  debugger
    this.Role = sessionStorage.getItem("UType");

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });

    this.Role = sessionStorage.getItem("UType");

  }

  public closeNav() {
    this.appDrawer.close();
    debugger
  }

  public openNav() {

    this.appDrawer.open();
    debugger
  }



  navItems: NavItem[] = [
    {
      displayName: 'Admin', // this.displayname,//
      iconName: 'recent_actors',
      children: [
        {
          displayName: 'Personal Details',
          iconName: 'edit',//perm_identity          
          route: ('Eprofile/' + sessionStorage.getItem("uid")) //this.Role is showing undefine
        }
      ]
    },
    {
      displayName: 'Vendor',
      iconName: 'group',
      children: [
        {
          displayName: 'List of All Vendors',
          iconName: 'person',//perm_identity         
          route: ('List/2/AlV')
        },
        {
          displayName: 'Edit/Modify Vendors',
          iconName: 'person',//perm_identity
          route: ('editlist/2/EV')
        },
        {
          displayName: 'Active Vendors List',
          iconName: 'person',//perm_identity
          route: ('selectlist/2/AcV')
        },
        {
          displayName: 'DeActive Vendors List',
          iconName: 'person',//perm_identity
          route: ('selectlist/2/DacV')
        }
        
      ]
    },
    {
      displayName: 'User',
      iconName: 'group',
      children: [
        {
          displayName: 'Users List',
          iconName: 'person',//perm_identity
          route: ('List/3/AlU')
        }
      ]
    },
    {
      displayName: 'Product',
      disabled: true,
      iconName: 'shopping_cart', //store_mall_directory',
      children: [
        {
          displayName: 'List of Products',
          iconName: 'store_mall_directory',//perm_identity
          route: 'productslist',

        },
        {
          displayName: 'Add Products',
          iconName: 'add_shopping_cart',//perm_identity
          route: 'products'
        },
        {
          displayName: 'test Products',
          iconName: 'store_mall_directory',//perm_identity
          route: 'list'
        }
      ]
    },
    {
      displayName: 'Orders',
      disabled: true,
      iconName: 'store_mall_directory', //store_mall_directory',
      children: [
        {
          displayName: 'List of Orders',
          iconName: 'store_mall_directory',//perm_identity
          route: 'orders'
        }
      ]
    },
    {
      displayName: 'Reports',
      disabled: true,
      iconName: 'crop_portrait'//'pages' //picture_as_pdf
    },
    {
      displayName: 'LogOut',
      disabled: true,
      iconName: 'power_settings_new',//'pages' //picture_as_pdf
      route: 'logout'
    }
  ];


  navVItems: Nav_VItem[] = [

    {
      displayName: 'Vendor',
      iconName: 'group',
      children: [       
        {
          displayName: 'Vendor Supply',
          iconName: 'person',
          route: ('vendoracc')
        },
        // mm 12/28
        {
          displayName: "Vendor Products",
          iconName: 'person',
          route: 'vendoritems'
        },
        //mm 1/9/19
        {
          displayName: "Vendor Items",
          iconName: 'person',
          route: 'venitemadd'
        },
        {
          displayName: "Item Description",
          iconName: 'person',
          route:'venitemdesc'
        }
      ]
    },    
    {
      displayName: 'Reports',
      disabled: true,
      iconName: 'crop_portrait'//'pages' //picture_as_pdf
    },
    {
      displayName: 'LogOut',
      disabled: true,
      iconName: 'power_settings_new',//'pages' //picture_as_pdf
      route: 'logout'
    }
  ];

}

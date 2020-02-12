import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WomenstoreComponent } from './womenstore/womenstore.component';
import { HomeComponent } from './home/home.component';
import { KurtisComponent } from './womenstore/kurtis/kurtis.component';
import { SidemenuComponent } from './womenstore/sidemenu/sidemenu.component';
import { LoginComponent } from '../app/login/login.component';
import { UsersettingsComponent, orders, EditProfile } from '../app/usersettings/usersettings.component';
import { ListComponentComponent } from './list-component/list-component.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { VendorComponent } from './vendor/vendor.component';
import { LogoutComponent } from './logout/logout.component';
import { ItemDescpComponent } from './item-descp/item-descp.component';
import { AddToBagComponent } from './add-to-bag/add-to-bag.component';
import { WhishListComponent } from './whish-list/whish-list.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { SidemenunavgtestComponent } from './sidemenunavgtest/sidemenunavgtest.component';
import { BrandswiseItemsComponent } from './brandswise-items/brandswise-items.component';
import { VendoraccComponent } from './vendoracc/vendoracc.component';
import { SelectlistComponent } from './selectlist/selectlist.component';
import { EditlistComponent } from './editlist/editlist.component';
import {VendoritemsComponent } from './vendoritems/vendoritems.component';

import { VenitemaddComponent } from './venitemadd/venitemadd.component';

import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { ListComponent } from './list/list.component';
import { VenitemdescComponent } from './venitemdesc/venitemdesc.component';

const routes: Routes = [
  //{

  //  path: 'womenstore',
  //  component: WomenstoreComponent
  //},

  {

    path: 'womenstore/:id/:name',
    component: WomenstoreComponent
  },
  {

    path: 'home',
    component: HomeComponent
  }, 
  //{
  //  path: 'kurtis',
  //  component: KurtisComponent
  //},
  //{
  //  path: 'kurtis/:name',
  //  component: KurtisComponent
  //},

  {
    path: 'kurtis/:name/:searchname/:url',
    component: KurtisComponent
  },

  {
    path: "sidemenu",
    component: SidemenuComponent
  },
  {
    path: 'usersettings',
    component:UsersettingsComponent
  },
  {
    path: 'usersettings/orders',
    component: orders
  },
  {
    path: 'usersettings/editprofile',
    component: EditProfile
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'itemdesc/:url',
    component: ItemDescpComponent
  },

  //10/12/2018
  {
    path: 'itembag',
    component: AddToBagComponent
  },


  {
    path: 'whishlist',
    component: WhishListComponent
  },

  //17/12/2018

  {
    path: 'checkout',
    component: CheckOutComponent
  },
  //SidemenunavgtestComponent
  {
    path: 'sidemenunav/:name',
    component: SidemenunavgtestComponent
  },
  {
    path: 'brandswiseitems/:name',
    component: BrandswiseItemsComponent
  },
  






{
  path: 'Eprofile/:Role', 
  component: EditProfileComponent    
},
{
  path: 'welcome',
  component: WelcomeComponent,
  pathMatch: 'full'
},
{
  path:'List/:Role/:LType',
  component: ListComponentComponent
},
{
  path:'editlist/:Role/:LType',
  component:EditlistComponent
},
{
  path:'selectlist/:Role/:LType',
  component:SelectlistComponent
  },


  {
    path: 'vendor',
    component: VendorComponent

  },
{
  path:'vendoracc',
  component:VendoraccComponent
  },
//mm 12/28
  {
    path: 'vendoritems',
    component:VendoritemsComponent
  },

  //mm 1/9/19
  {
    path: 'venitemadd',
    component:VenitemaddComponent
  },
  {
    path: 'venitemdesc',
    component:VenitemdescComponent
  },
  {
  path:'products',
  component:ProductsComponent
  },
  {
    path:'productslist',
    component:ListComponent
  },
  {
  path:'orders',
  component:OrdersComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogContentExampleDialog } from './app.component';
import { MDBBootstrapModule, WavesModule, ModalModule, CarouselModule, ButtonsModule, IconsModule, NavbarModule, CollapseModule} from 'angular-bootstrap-md';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatInputModule, MatIconModule, MatTabsModule, MatRadioModule, MatSidenavModule, MatToolbarModule, MatListModule, MatSelectModule, MatExpansionModule, MatButtonModule} from '@angular/material';
import { WomenstoreComponent } from './womenstore/womenstore.component';
import { HomeComponent } from './home/home.component';
import { EqualValidator } from '../app/shared/equal-validator';
import { KurtisComponent } from './womenstore/kurtis/kurtis.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';
import { SidemenuComponent } from './womenstore/sidemenu/sidemenu.component';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrModule } from 'ngx-toastr';
import { UsersettingsComponent, orders, EditProfile} from './usersettings/usersettings.component';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
//import { ImageCropperComponent } from 'ng2-img-cropper';
import { ImageCropperModule } from "ng2-img-cropper/index";

//sudha
import { VendorComponent } from './vendor/vendor.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { NavService } from './services/nav.service';


import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { LogoutComponent } from './logout/logout.component';
import { ItemDescpComponent } from './item-descp/item-descp.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AddToBagComponent } from './add-to-bag/add-to-bag.component';
import { WhishListComponent } from './whish-list/whish-list.component';

import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CheckOutComponent } from './check-out/check-out.component';
import {MatStepperModule} from '@angular/material/stepper';



//import { AccordionModule, BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { SidemenunavgtestComponent } from './sidemenunavgtest/sidemenunavgtest.component';
import { BrandswiseItemsComponent } from './brandswise-items/brandswise-items.component';

import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule,MatSortModule} from '@angular/material';

import { MatFormFieldModule } from '@angular/material';
import { EditlistComponent } from './editlist/editlist.component';
import { SelectlistComponent } from './selectlist/selectlist.component';
import { VendoraccComponent } from './vendoracc/vendoracc.component';
import { ListComponent } from './list/list.component';
import{ ListComponentComponent } from './list-component/list-component.component';
import { VendoritemsComponent } from './vendoritems/vendoritems.component';

import 'jquery';

import { VenitemaddComponent } from './venitemadd/venitemadd.component';

import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import { VenitemdescComponent } from './venitemdesc/venitemdesc.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {MatDatepickerModule,MatNativeDateModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, DialogContentExampleDialog,  WomenstoreComponent, HomeComponent, EqualValidator, KurtisComponent, SidemenuComponent, UsersettingsComponent,

    orders, EditProfile, MenuListItemComponent, VendorComponent, WelcomeComponent, TopNavComponent, SideNavComponent, ListComponentComponent, LogoutComponent, ItemDescpComponent, AddToBagComponent, WhishListComponent, CheckOutComponent, EditProfileComponent, SidemenunavgtestComponent, BrandswiseItemsComponent, EditlistComponent, ListComponent, SelectlistComponent, VendoraccComponent, VendoritemsComponent, ProductsComponent, OrdersComponent,
    VenitemaddComponent,
    VenitemdescComponent,
    FileUploadComponent
    ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    WavesModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    ButtonsModule.forRoot(),
    IconsModule,
    BrowserAnimationsModule, MatDialogModule, MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule, MatTabsModule, MatRadioModule,
    Ng2CarouselamosModule, MatSidenavModule, MatToolbarModule, MatListModule, NavbarModule,
    HttpClientModule, ToastrModule.forRoot(), MatMenuModule, CollapseModule.forRoot(), MatExpansionModule, MatButtonModule, 
    MatSelectModule,ImageCropperModule,ShowHidePasswordModule.forRoot(),MatButtonToggleModule,MatStepperModule,
    ImageCropperModule,ShowHidePasswordModule.forRoot(),MatButtonToggleModule,MatTableModule,MatCheckboxModule,
    MatPaginatorModule,MatSortModule ,MatSortModule,MatFormFieldModule,MatDatepickerModule,MatNativeDateModule
    //DropdownModule,
    //AccordionModule.forRoot(),
    //BsDropdownModule.forRoot(),TabsModule.forRoot()


  ],
  providers: [NavService,MatDatepickerModule],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent,
    DialogContentExampleDialog    
  ]
})
export class AppModule { }

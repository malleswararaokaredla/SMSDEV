import { Component, OnInit, ElementRef, VERSION, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { NavItem, SmsfashionapiService } from '../services/smsfashionapi.service';
import { Router } from '@angular/router';
import { UserRegisterModel } from '../models/UserRegisterModel';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { Address } from '../models/AddressModel';
import { UserPersonalData } from '../models/UserPersonalData';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { PasswordChange } from '../models/PasswordChangeModel';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
//import { isNumber } from 'util';
@Component({
  selector: 'app-usersettings',
  templateUrl: './usersettings.component.html',
  styleUrls: ['./usersettings.component.scss']
})
export class UsersettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}



//orders component
@Component({
  selector: 'app-orders',
  templateUrl: 'orders.html',
  styleUrls: ['usersettings.component.scss'],
})
export class orders {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  catcount: Number;
  applog: string;
  navItems: NavItem[];
  ordersdata: Array<any> = [];
  ordsimagsdata: Array<any> = [];
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  name: string;

  itms_sizes: Array<any> = ["dd", "xs"];


  constructor(private app: AppComponent, private dataservice: SmsfashionapiService, private router: Router, private toastr: ToastrService, public dialog: MatDialog) {

    if (!sessionStorage.getItem("uid")) {
      this.router.navigate(['/home']);
    }


    this.applog = this.dataservice.getapplog();
    this.navItems = this.dataservice.navItems;
 
    this.catcount = this.dataservice.GetBagCount();
    this.dataservice.Getoderesdata(Number.parseInt(sessionStorage.getItem("uid"))).subscribe(data => {


      this.ordersdata = data["res"]["table"];
      this.ordsimagsdata = data["res"]["table1"];
      this.name = sessionStorage.getItem("userName");
    },

      error => {

        if (error["status"] == 401) {
          this.toastr.error("Your Sesstion Expired... Please Login", "Session", { timeOut: 2000, positionClass: 'toast-top-right' });

          sessionStorage.removeItem("token");
          sessionStorage.removeItem("userName");
          sessionStorage.removeItem("uid");
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("expiration");
          this.router.navigateByUrl("/home");
        }
      });
  }


  ngAfterViewInit() {
    this.dataservice.appDrawer = this.appDrawer;
  }
  openorderspage() {

    this.router.navigateByUrl("/usersettings/orders");
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

  prifilepage() {
    this.router.navigateByUrl("/usersettings/editprofile");
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


  displayitemdesc(id) {

    this.dataservice.item_id = Number.parseInt(id);

    let url: string = this.name;
    this.router.navigate(['/itemdesc', url]);

  }

}


//profile component

@Component({
  selector: 'app-profile',
  templateUrl: 'EditProfile.html',
  styleUrls: ['usersettings.component.scss'],
})
export class EditProfile {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;
  show: boolean = true;
  navItems: NavItem[];
  disbltext: boolean = true;
  btnhide: boolean = true;
  is_edit: boolean = true;
  editbtn2: boolean = true;
  btnhide2: boolean = true;
  imgdata: string;
  disimg: string = null;
  showimg: boolean = true;
  addrstxtbx: boolean = true;
  isEditItems: boolean = false;
  fieldArray: Array<any> = [];
  existingaddress: Array<any> = [];
  display: boolean = false;
  is_disedit: boolean = true;
  dynmedithide: boolean = false;
  newAttribute: any = {};
  closebttn: boolean = true;
  dynmicaddrscount: number = 0;
  dymicbtns: boolean = true;
  catcount: number;



  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  newaddrs: Array<any> = [];

  reg: UserRegisterModel = {
    firstname: null,
    lastname: null,
    email: null,
    phoneno: null,
    password: null,
    confirmpassword: null,
    gender: null
  };
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
  userpdata: UserPersonalData = {
    uid: null,
    firstname: null,
    lastname: null,
    email: null,
    phoneno: null,
    gender: null
  }

  paswrd: PasswordChange = {
    uid: null,
    cname: null
  }



  addrslist: Address[];

  //droppedData: File;

  //dragEnd(event) {
  //  console.log('Element was dragged', event);
  //}



  //Cropper 1 data
  data1: any;
  cropperSettings1: CropperSettings;

  //Cropper 2 data
  data2: any;
  filename: File;
  cropperSettings2: CropperSettings;


  //emp_imgdata: ImageModel = {
  //  emp_id: null,
  //  ContentType: null,
  //  Name: null,
  //  Imdata: null
  //}

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(private app: AppComponent, private dataservice: SmsfashionapiService, private router: Router, public dialog: MatDialog, private toastr: ToastrService,
    private _sanitizer: DomSanitizer, private fb: FormBuilder) {


    if (!sessionStorage.getItem("uid")) {
      this.router.navigate(['/home']);
    }


    this.navItems = this.dataservice.navItems;

    //this.dataservice.GetUsersDetailsById(1).subscribe(x => {


    //  console.log(x);
    //});

    this.getusersdata();

    this.catcount = this.dataservice.GetBagCount();

    //for image

    this.cropperSettings1 = new CropperSettings();
    this.cropperSettings1.width = 200;
    this.cropperSettings1.height = 200;

    this.cropperSettings1.croppedWidth = 200;
    this.cropperSettings1.croppedHeight = 200;

    this.cropperSettings1.canvasWidth = 500;
    this.cropperSettings1.canvasHeight = 300;

    this.cropperSettings1.minWidth = 100;
    this.cropperSettings1.minHeight = 100;

    this.cropperSettings1.rounded = false;

    this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

    this.data1 = {};


    //Cropper settings 2
    this.cropperSettings2 = new CropperSettings();
    this.cropperSettings2.width = 200;
    this.cropperSettings2.height = 200;
    this.cropperSettings2.keepAspect = false;

    this.cropperSettings2.croppedWidth = 200;
    this.cropperSettings2.croppedHeight = 200;

    this.cropperSettings2.canvasWidth = 500;
    this.cropperSettings2.canvasHeight = 300;

    this.cropperSettings2.minWidth = 100;
    this.cropperSettings2.minHeight = 100;

    this.cropperSettings2.rounded = true;
    this.cropperSettings2.minWithRelativeToResolution = false;

    this.cropperSettings2.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings2.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings2.noFileInput = true;

    this.data2 = {};
  }

  productForm: FormGroup;


  addFieldValue() {
    debugger
    let count = 5 - this.existingaddress.length;
    if (this.fieldArray.length < count) {
      this.isEditItems = true;
      this.fieldArray.push(this.newAttribute);
      debugger
      this.newAttribute = {};
      this.is_edit = false;
      this.dymicbtns = false;
      this.closebttn = false;
    } else {

    }
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
    if (this.fieldArray.length <= 0) {
      this.dymicbtns = true;
      debugger
    }
  }
  deletedymicaddrs(index) {

    // this.fieldArray.splice(index, 1);
    if (this.existingaddress.length > 1) {
      this.dataservice.DeleteAddrsDataById(this.existingaddress[index]).subscribe(data => {
        this.existingaddress.splice(index, 1);
        this.toastr.success("Address Details Deleted Successfully");

      },
        error => {
          if (error["status"] != 200) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("userName");
            sessionStorage.removeItem("uid");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("expiration");
            this.toastr.error("Your Session Exipired");
            this.router.navigate(['/home']);

          }
        }
      )
    }
    else {
      this.closebttn = true;
    }
  }
  onEditCloseItems() {
    this.isEditItems = !this.isEditItems;
  }

  getusersdata() {

    if (sessionStorage.getItem("uid")) {

      this.dataservice.GetUsersDetailsById(Number.parseInt(sessionStorage.getItem("uid"))).subscribe(data => {

        this.reg.firstname = data["userdata"]["firstName"];
        this.reg.lastname = data["userdata"]["lastName"];
        this.reg.email = data["userdata"]["email"];
        this.reg.phoneno = data["userdata"]["phoneNo"];
        this.reg.gender = data["userdata"]["gender"];
        this.imgdata = data["userdata"]["image"];

        if (this.imgdata != "") {
          this.disimg = this.imgdata;
        }
        else {
          this.show = false;
        }

      },
        error => {

          if (error["status"] != 200) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("userName");
            sessionStorage.removeItem("uid");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("expiration");

            this.toastr.error("Your session expired");
            this.router.navigate(['/home']);
          }

        });
    }
    else {
    }
  }

  getuseraddressdata() {

    this.dataservice.GetUserAddressDetailsById(Number.parseInt(sessionStorage.getItem("uid"))).subscribe((data: Address[]) => {

      if (data.length > 0) {
        this.is_edit = true;
        this.existingaddress = data;
        this.addrslist = data.map(x => Object.assign({}, x));

        //  this.fieldArray.length = this.existingaddress.length;
        this.display = true;
        this.closebttn = false;
        //this.dynmicaddrscount = 6 - data.length;
      }
      else {

        this.is_edit = false;
        this.dynmicaddrscount = 5;
      
        if (this.fieldArray.length <= 0) {
          this.addFieldValue();
          this.closebttn = true;
        }
      }
    });
  }



  cropped(bounds: Bounds) {
    //console.log(bounds);
  }

  ngAfterViewInit() {
    this.dataservice.appDrawer = this.appDrawer;
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

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  EditMode() {


    this.btnhide = false;

    this.disbltext = false;
  }

  cancelMode() {
    this.disbltext = true;
    this.btnhide = true;
  }

  saveprofileinfo(regForm) {

    this.userpdata.uid = Number.parseInt(sessionStorage.getItem("uid"));
    this.userpdata.firstname = this.reg.firstname;
    this.userpdata.lastname = this.reg.lastname;
    this.userpdata.email = this.reg.email;
    this.userpdata.phoneno = this.reg.phoneno;
    this.userpdata.gender = this.reg.gender;

    //console.log(this.userpdata);

    this.dataservice.UpdateUserPersonaldata(this.userpdata).subscribe(data => {

      this.toastr.success(data["res"], "User Personal Data");
    }
      ,
      error => {

        //if (error["status"] == 200) {

        //  //  this.router.navigate(['/home'])
        //  this.toastr.success("User Updated Successfully", "Register");
        //  console.log("Error", error);
        //}
        //else if (error["status"] === 401) {
        //  sessionStorage.removeItem("token");
        //  sessionStorage.removeItem("userName");
        //  sessionStorage.removeItem("uid");
        //  sessionStorage.removeItem("email");
        //  sessionStorage.removeItem("expiration");
        //  this.router.navigate(['/home']);

        //}
        if (error["status"] != 200) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("userName");
          sessionStorage.removeItem("uid");
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("expiration");
          this.router.navigate(['/home']);

        }
      });
    this.cancelMode();
  }

  EditMode2() {
    this.editbtn2 = false;
    this.btnhide2 = false;
  }
  cancelMode2() {
    this.editbtn2 = true;
    this.btnhide2 = true;
  }

  savepasswordinfo() {

    this.paswrd.uid = Number.parseInt(sessionStorage.getItem("uid"));
    this.paswrd.cname = this.reg.password;
    this.dataservice.updatePassword(this.paswrd).subscribe(data => {

      this.toastr.success(data["res"], "Change Password");
      this.resetMode();
    },
      error => {

        //if (error["status"] == 200) {

        //  this.toastr.success("Password Updated Successfully", "Change Password");
        //  this.resetMode();
        //}
        //else if (error["status"] === 401) {
        //  sessionStorage.removeItem("token");
        //  sessionStorage.removeItem("userName");
        //  sessionStorage.removeItem("uid");
        //  sessionStorage.removeItem("email");
        //  sessionStorage.removeItem("expiration");
        //  this.router.navigate(['/home'])

        //}
        if (error["status"] !=200) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("userName");
          sessionStorage.removeItem("uid");
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("expiration");
          this.router.navigate(['/home']);

        }
      });
  }
  resetMode() {
    this.reg.password = "";
    this.reg.confirmpassword = "";
  }
  saveimg() {
    // console.log(this._sanitizer.bypassSecurityTrustResourceUrl(this.data2));

    // Naming the image
    //const date = new Date().valueOf();
    //let text = '';
    //const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //for (let i = 0; i < 5; i++) {
    //  text += possibleText.charAt(Math.floor(Math.random() * possibleText.length));
    //}

    //const imageName = date + '.' + text + '.jpeg';

    //const imageBlob = this.dataURItoBlob(this.data2["image"]);

    //const imageFile = new File([imageBlob], imageName, { type: 'image/jpeg' });
    //console.log(imageFile);

    this.imgdata = this.data2["image"];
    this.imgdata = this.imgdata.replace(/^data:image\/[a-z]+;base64,/, "");
    this.paswrd.uid = Number.parseInt(sessionStorage.getItem("uid"));
    this.paswrd.cname = this.imgdata;

    this.dataservice.Uploadprofilephoto(this.paswrd).subscribe(x => {
      this.toastr.success("ProfilePic Updated Successfully", "Profile Photo");
      this.showimg = true;
      this.getusersdata();
    },
      error => {

        //if (error["status"] == 200) {

        //  this.toastr.success("ProfilePic Updated Successfully", "Profile Photo");
        //  this.showimg = true;
        //  this.getusersdata();
        //  //this.resetMode();
        //}
        //else if (error["status"] === 401) {

        //  sessionStorage.removeItem("token");
        //  sessionStorage.removeItem("userName");
        //  sessionStorage.removeItem("uid");
        //  sessionStorage.removeItem("email");
        //  sessionStorage.removeItem("expiration");
        //  this.router.navigate(['/home'])

        //}

        if (error["status"]!=200) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("userName");
          sessionStorage.removeItem("uid");
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("expiration");
          this.router.navigate(['/home']);

        }
      })
  }

  //image change
  fileChangeListener(event) {
    this.showimg = false;

    var image: any = new Image();
    var file: File = event.target.files[0];
    this.filename = event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;


      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }

  _keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  //address
  saveaddrsdata() {
  
    this.fieldArray.forEach((data) => {
      if (!data.hasOwnProperty("aid")) {
        data["aid"] = 0;
        data["uid"] = Number.parseInt(sessionStorage.getItem("uid"));
        this.newaddrs.push(data);
      }
    })
  
    this.dataservice.ADDlListOfAddress(this.newaddrs).subscribe(x => {
      this.toastr.success("Address Added Successfully");
      this.showimg = true;
      this.getuseraddressdata();

    }, error => {

      //if (error["status"] == 200) {

      //  this.toastr.success("Address Added Successfully");
      //  this.showimg = true;
      //  this.getuseraddressdata();
      //  //this.resetMode();
      //}
      //else if (error["status"] === 401) {

      //  sessionStorage.removeItem("token");
      //  sessionStorage.removeItem("userName");
      //  sessionStorage.removeItem("uid");
      //  sessionStorage.removeItem("email");
      //  sessionStorage.removeItem("expiration");
      //  this.router.navigate(['/home'])

      //}

      if (error["status"] != 200) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("uid");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("expiration");
        this.router.navigate(['/home']);

      }
    });
  }


  saveaddrs1data() {

    this.adrs.uid = Number.parseInt(sessionStorage.getItem("uid"));
    this.adrs.aid = 0;
    this.dataservice.AddAddressApi(this.adrs).subscribe(x => {
    },
      error => {
        this.getuseraddressdata();
      });
  }
  addrseditmode(index) {
    this.dynmedithide = true;
  }

  dymnicdisplycancelmode() {
    this.dynmedithide = false;
  }

  saveaddressbyAID(index) {

    this.dataservice.UpdateAddressByIdApi(this.existingaddress[index]).subscribe(data => {
      this.toastr.success("Details Updated Successfully");
      this.getuseraddressdata();
    },
      error => {
        if (error["status"] != 200) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("userName");
          sessionStorage.removeItem("uid");
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("expiration");
          this.router.navigate(['/home']);

        }
        //if (error["status"] == 200) {

        //  this.toastr.success("Details Updated Successfully");

        //  this.getuseraddressdata();

        //}
        //else if (error["status"] === 401) {

        //  sessionStorage.removeItem("token");
        //  sessionStorage.removeItem("userName");
        //  sessionStorage.removeItem("uid");
        //  sessionStorage.removeItem("email");
        //  sessionStorage.removeItem("expiration");
        //  this.router.navigate(['/home'])

        //}
      }

    )
  }

  Fillexistingdata(index) {
    // console.log(this.addrslist[index]);
    // console.log(this.existingaddress[index]);
    this.existingaddress[index] = this.addrslist[index];

  }

  logout() {
    this.router.navigate(['/logout']);
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
    if (sessionStorage.getItem("uid")) {
      this.router.navigateByUrl("/whishlist");
    }
  }
}

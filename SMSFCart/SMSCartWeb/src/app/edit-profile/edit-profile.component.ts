import { Component, OnInit, ElementRef, VERSION,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmsfashionapiService } from '../services/smsfashionapi.service';
import { NavService } from '../services/nav.service';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { ToastrService } from 'ngx-toastr';
import { UserRegisterModel } from '../models/UserRegisterModel';
import { Address } from '../models/AddressModel';
import { UserPersonalData } from '../models/UserPersonalData';
import { PasswordChange } from '../models/PasswordChangeModel';
import { CommonService } from '../services/common.service';
import { NavItem } from '../models/nav-item';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;  
  
  Role:string;
  isLinear:boolean = true;
  navItems: NavItem[];

  show: boolean = true;  
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
  display: boolean = true;
  is_disedit: boolean = true;
  dynmedithide: boolean = false;
  newAttribute: any = {};
  closebttn: boolean = true;
  dynmicaddrscount: number = 0;
  dymicbtns: boolean = true;

  TypeArray: Array<any> = ["Home","Office"]; // Insert Type ofiice address into DB


  Adddisplay: boolean = false;

  addrslist: Address[];

  newaddrs: Array<any> = [];

  //Cropper 1 data
  data1: any;
  cropperSettings1: CropperSettings;

  //Cropper 2 data
  data2: any;
  filename: File;
  cropperSettings2: CropperSettings;


  Edit: UserRegisterModel=
  {
    firstname: null,
    lastname: null,
    email: null,
    phoneno: null,
    password: null,
    confirmpassword: null,
    gender: null

  }  

  adrs: Address=
  {
    address: null,
    town: null,
    city: null,
    pincode: null,
    state: null,

    aid: null,
    uid: null,   
    type: null,
    avaldays: null,
    time: null,
  }

  userpdata: UserPersonalData={
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



  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
  
  constructor(private navService: NavService,private route:ActivatedRoute,//private _formBuilder: FormBuilder,
    private router: Router, private dataservice: SmsfashionapiService,private toastr: ToastrService,
    private commonService: CommonService) { 
    this.navItems= this.navService.navItems;


    //commonService.IsAVLoginedIn();

    //For Load Personal Details
    this.getDataFromDB();

    //for Default Image
    this.disimg = this.commonService.getNoImage();

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
  
  cropped(bounds:Bounds) {
    //console.log(bounds);
}

 //image change
 fileChangeListener(event) {
  
  var image: any = new Image();
  var file: File = event.target.files[0];
  this.filename = event.target.files[0];
  var myReader: FileReader = new FileReader();
  var that = this;
  
  const imageType = file.name;

   if (this.validateFile(imageType)) 
  { 
    this.showimg = false;  //set new
    myReader.onloadend = function (loadEvent: any) 
    {
    image.src = loadEvent.target.result;
    that.cropper.setImage(image);
    };      
  }

else
{
  
  this.showimg = true;  //Set old

  this.toastr.error("Invalid Image / File", "Image Upload");
}
 
  myReader.readAsDataURL(file);  
}

validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpeg' || 
        ext.toLowerCase() == 'jpg'  || ext.toLowerCase() == 'gif' || 
        ext.toLowerCase() == 'tiff') 
    {
        return true;
    }
    else {
        return false;
    }
}

reset()
{
  this.getDataFromDB();
  this.getAddresFromDB();
  this.cancelMode();
  this.cancelAddress(); 
}
//To ge Data From DB

getDataFromDB() {
  if (sessionStorage.getItem("uid")) 
  {  
    this.dataservice.GetUsersDetailsById(Number.parseInt(sessionStorage.getItem("uid"))).subscribe(Pdata => {     
      this.Edit.firstname = Pdata["userdata"]["firstName"];
      this.Edit.lastname = Pdata["userdata"]["lastName"];
      this.Edit.email = Pdata["userdata"]["email"];
      this.Edit.phoneno = Pdata["userdata"]["phoneNo"];
      this.Edit.gender = Pdata["userdata"]["gender"];
      this.imgdata = Pdata["userdata"]["image"];

      if (this.imgdata != "") {
        this.disimg = this.imgdata;
      }
      else {
        this.disimg = this.commonService.getNoImage();
        //this.show = false;
      }

    },
      error => {
        if (error["status"] == 401) {         
          this.toastr.error("Your session expired");
          sessionStorage.clear();
          this.router.navigate(['/vendor']);
        }

      });
  } 
  else
  {
    //Check with ISAVLogin()
  }
}


getAddresFromDB()
 { 
  if (sessionStorage.getItem("uid")) 
  {  
  this.dataservice.GetUserAddressDetailsById(Number.parseInt(sessionStorage.getItem("uid"))).subscribe((Adata: Address[]) =>
    {   
      if (Adata.length > 0) 
      {
        this.is_edit = true;
        this.existingaddress = Adata;
        this.addrslist = Adata.map(x => Object.assign({}, x));        
        this.display = true;
        this.closebttn = false; 
        
        if (Adata.length < 2)
        {
          this.Adddisplay=true;
        } 
        else
        {
          this.Adddisplay=false;
        }    
      }
      else 
      {       
        this.is_edit = false;
        this.dynmicaddrscount = 2;       
        if (this.fieldArray.length <= 0) {
          this.addAddress();
          this.closebttn = true;
        }
        this.Adddisplay=true;
      }
    
    });  
  } 
  else
  {
    //Check with ISAVLogin()
  }
}


_keyPress(event: any) {
  const pattern = /[0-9\+\-\ ]/;
  let inputChar = String.fromCharCode(event.charCode);

  if (!pattern.test(inputChar)) {
    // invalid character, prevent input
    event.preventDefault();
  }
}

deleteAddress(index) {
  this.fieldArray.splice(index, 1);
  if (this.fieldArray.length <= 0) {
    this.dymicbtns = true;

    this.Adddisplay=true;
  }

}

deletedymicAddrs(index) { 
  if (this.existingaddress.length > 1) {
    this.dataservice.DeleteAddrsDataById(this.existingaddress[index]).subscribe(data => {
      this.existingaddress.splice(index, 1);
      this.toastr.success("Address Details Deleted Successfully");
      this.Adddisplay=true;
    },
      error => {
        if (error["status"] === 401) {         
          this.toastr.error("Your Session Exipired");
          sessionStorage.clear();
      this.router.navigate(['/vendor']);

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

EditMode() {
  this.btnhide = false;
  this.disbltext = false;
}

cancelMode() {
  this.disbltext = true;
  this.btnhide = true;
}

step = 0;


setStep(index: number) {
  this.step = index;
}

prevStep() {
  this.step--;
}

nextStep() {
  this.step++;
}

savePersonalData(EditForm) {

  this.userpdata.uid = Number.parseInt(sessionStorage.getItem("uid"));
  this.userpdata.firstname = this.Edit.firstname;
  this.userpdata.lastname = this.Edit.lastname;
  this.userpdata.email = this.Edit.email;
  this.userpdata.phoneno = this.Edit.phoneno;
  this.userpdata.gender = this.Edit.gender;

  this.dataservice.UpdateUserPersonaldata(this.userpdata).subscribe(data => {   
    this.toastr.success(data["res"], "User Personal Data");
    
  }
    ,
    error => {      
      if (error["status"] === 401) {
        this.toastr.error("Your session expired");
        sessionStorage.clear();
      this.router.navigate(['/vendor']);

      }
    });
  this.cancelMode();
}


savePassword() {
  this.paswrd.uid = Number.parseInt(sessionStorage.getItem("uid"));
  this.paswrd.cname = this.Edit.password;

  this.dataservice.updatePassword(this.paswrd).subscribe(data => {
    
    this.toastr.success(data["res"], "Change Password");
    this.resetMode();
    this.nextStep();
  },
    error => {
      
      if (error["status"] === 401) {
        this.toastr.error("Your session expired");
        sessionStorage.clear();
      this.router.navigate(['/vendor']);

      }
    });
}

resetMode() {
  this.Edit.password = "";
  this.Edit.confirmpassword = "";
}

EditAddress() 
{
    this.editbtn2 = false;
    this.btnhide2 = false;
}

cancelAddress() {
  this.editbtn2 = true;
    this.btnhide2 = true;
}

addAddress() {  
  let count = 2 - this.existingaddress.length; 
  if (this.fieldArray.length < count) {
    this.isEditItems = true;
    this.fieldArray.push(this.newAttribute);

    this.newAttribute = {};
    this.is_edit = false;
    this.dymicbtns = false;
    this.closebttn = false;

    this.Adddisplay=false;
  } 
  else
   {   
      this.Adddisplay=true;
  }
}



 //address
 saveAddrs() {
   
   this.fieldArray.forEach((data) => {
    if (!data.hasOwnProperty("aid")) {
      data["aid"] = 0;
      data["uid"] = Number.parseInt(sessionStorage.getItem("uid"));
      data["type"] = this.TypeArray[0];
      this.newaddrs.push(data); 
    }
  })  
  this.dataservice.ADDlListOfAddress(this.newaddrs).subscribe(nadata => {

    this.toastr.success("Address Added Successfully");
    this.showimg = true;
    this.getAddresFromDB();

  }, error => {   

    if (error["status"] === 401) {     
      this.toastr.error("Your session expired");
      sessionStorage.clear();
      this.router.navigate(['/vendor']);
    }
  });
}


saveAddressbyAID(index) 
{  
  this.existingaddress[index]["type"]=this.TypeArray[1];
  this.dataservice.UpdateAddressByIdApi(this.existingaddress[index]).subscribe(data => {  
    this.toastr.success("Details Updated Successfully");
    this.getAddresFromDB();
  },
    error => {
      if (error["status"] === 401) {      
        this.toastr.error("Your session expired");
        sessionStorage.clear();
        this.router.navigate(['/vendor']);

      }
     
    }

  )
}

Fillexistingdata(index) { 
  this.existingaddress[index] = this.addrslist[index]; 
}



saveProfilePic() {

  this.imgdata = this.data2["image"];
  this.imgdata = this.imgdata.replace(/^data:image\/[a-z]+;base64,/, "");
  this.paswrd.uid = Number.parseInt(sessionStorage.getItem("uid"));
  this.paswrd.cname = this.imgdata;
  debugger

  this.dataservice.Uploadprofilephoto(this.paswrd).subscribe(x => {
    this.toastr.success("Picture Updated Successfully", "Profile Picture");
    this.showimg = true;
    this.getDataFromDB();
    debugger
  },
    error => {    

      if (error["status"] === 401) {
        this.toastr.error("Your session expired");
        sessionStorage.clear();
        this.router.navigate(['/vendor']);

      }
    })
}

  ngOnInit() {
    
    //This is Check Admin / vendor collection
    this.Role = this.route.snapshot.params['Role'];  

    this.navService.appDrawer = this.appDrawer;

  }
}

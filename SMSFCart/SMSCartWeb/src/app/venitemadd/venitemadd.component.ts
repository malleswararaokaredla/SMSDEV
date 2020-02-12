import { Component, OnInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { EntryService } from '../services/entry.service';
import { NavService } from '../services/nav.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NavItem } from '../models/nav-item';
import { Vitem } from '../models/VitemModel';
import { productModel } from '../models/productModel';
import { HttpErrorResponse, HttpRequest, HttpClient, HttpEventType } from '@angular/common/http';
import { NgForm,FormGroup,FormArray } from '@angular/forms';
import { CommandName } from 'selenium-webdriver';
import { Vendesc } from '../models/VendescModel';
declare var $: any;

@Component({
  selector: 'app-venitemadd',
  templateUrl: './venitemadd.component.html',
  styleUrls: ['./venitemadd.component.scss']
})
export class VenitemaddComponent   {

  readonly rootUrl = 'https://localhost:44307';
  public progress: number;
  public message: string;
  Fdata: any;

  existingaddress: Array<any> = [];
  newAttribute: any = {};
  newitemAttribute: any = {};

  catimgname: Array<any> = [];
  newitemdesc: Array<any> = [];

  fieldArray: Array<any> = [];
  itemArray: Array<any> = [];

  closebttn: boolean = true;

  itemimg: string = "";
  itemimgshape: string = "";
  itms: string[];

  @ViewChild('appDrawer') appDrawer: ElementRef;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  version = VERSION;
  navItems: NavItem[];//List itms array
  

  vitem: Vitem = {
    itemname: null,
    cat_img: null,
    PID: 0,
    prod_cat_id: 0,
    prod_subcat_id: 0,
    itm_id:0,
    vendorid: 0,
    imgname: null,
    pscName: null,
    pcName: null,
    PName: null,
    catimgname: null,
    catlog_img:null
  };

  uType: string;

  myFiles: string[] = [];
  sMsg: string = '';

  vid: number;
  vname: string;
  products: string[];
  _values1: Array<any> = [];
  prodcategories: string[];
  prodsubcategories: string[];
  id: number;

  nrSelect: number;
  pcitem: number;
  psitem: number;
  fileToUpload: File;
  filename: any;
  showimg: boolean = true;
  showimgshape: boolean = true;

  imgdata: string;
  fname: any;
  vendordata: string[];

  public documentGrp: FormGroup;
  public totalfiles: Array<File> = [];
  public totalFileName = [];
  public lengthCheckToaddMore = 0;
  vitems: Array<Vitem> = [];

  constructor(private entryService: EntryService, private navService: NavService, private toaster: ToastrService, private router: Router, private httpService: HttpClient) {
    //To get menu
    this.navItems = this.navService.navVItems;  
  }

  ngOnInit() {
    //This is to get Type
    //this.resetForm();
    this.uType = sessionStorage.getItem('UType');

    //This for side menu 
    this.navService.appDrawer = this.appDrawer;

    //To get menu
    this.navItems = this.navService.navVItems;

    this.vid = Number.parseInt(sessionStorage.getItem("uid"));

    this.vname = sessionStorage.getItem("userName");
    debugger

    if (Number.isNaN(this.vid)) {
      debugger
      this.router.navigateByUrl('/vendor');
    }

    this.addFieldValue();
    this.additemValue();
    this.vendoritems();
  }



  imgURL: any;
  j: number = 0;
  catimgurl: string = '';
  repimg: string = '';
  repimg1: string = '';
  catlogimgname: string = '';
  myimgurl: Array<any> = [];
  imgcaturl: Array<any> = [];
  imgcatval: string = '';

  getFileDetails(e) {
    //console.log (e.target.files);
    if (this.itemimgshape != undefined) {
      debugger
      this.itemimgshape = "";
    }
    
    this.showimgshape = false;
    var catimage: any = new Image();
    var file: File = e.target.files[0];
    this.filename = e.target.files[0];
    this.fname = e.target.files[0].name;

    debugger
    var fReader: FileReader = new FileReader();
    var that = this;
    let catres: string = "";
    fReader.onloadend = function (loadEvent: any) {
      catimage.src = loadEvent.target.result;
      console.log(catimage.src);
      catres = catimage.src;
      console.log(catres);

      that.itemimgshape = catres;
      sessionStorage.setItem('itemimgshape', JSON.stringify(catres));     
      debugger
    }
    this.myimgurl.push(JSON.parse('[' + sessionStorage.getItem("itemimgshape") + ']'));
    console.log(this.myimgurl);
   
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
      this.catimgname.push(e.target.files[i].name);
     
      debugger
      console.log(this.myFiles);
      
    }


  }

  Fileupload(event) {
    this.showimg = false;

    var image: any = new Image();
    var file: File = event.target.files[0];
    this.filename = event.target.files[0];
    this.fname = event.target.files[0].name;
    var myReader: FileReader = new FileReader();
    var that = this;
    let res: string = "";

    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      console.log(image.src);
      res = image.src;
      console.log(res);

      that.itemimg = res;
      debugger
    }
    console.log(res);



    myReader.readAsDataURL(file);

  }
 

  detectFiles(event) {
  
    this.catimgurl = '';
    if (this.imgURL != undefined) {
      debugger
      this.imgURL = ''; 
    }

    this.showimgshape = false;
    this.selectedFiles = event.target.files;

    debugger
    if (event.target.files && event.target.files[0]) {
      var reader:FileReader = new FileReader();
      reader.onload = (event: any) => {
        
        this.imgURL = event.target.result;
       // console.log(this.imgURL);
        sessionStorage.setItem('imgshape', JSON.stringify(this.imgURL));
        this.catimgurl = JSON.parse('[' + sessionStorage.getItem("imgshape") + ']');       
        debugger
        //console.log(this.catimgurl);
      }
     
      reader.readAsDataURL(event.target.files[0]);
      this.myimgurl.push(JSON.parse('[' + sessionStorage.getItem("imgshape") + ']'));
     
    }
   
  
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
      this.catimgname.push(event.target.files[i].name);

    }
  
    this.catlogimgname = this.catimgname.join(',');
    console.log(this.myimgurl);
   
   
   debugger
  }

  onRegister(items) {
    debugger
    //this.uploadFiles();

    this.vitem.vendorid = this.vid;
    if (this.vitem.vendorid == 0) {
      debugger
      this.router.navigateByUrl('/vendor');
    }
    else {
      debugger
      this.vitem.cat_img = this.itemimg;
      this.vitem.imgname = this.fname;
      this.vitem.cat_img = this.vitem.cat_img.replace(/^data:image\/[a-z]+;base64,/, "");
      this.vitem.catlog_img = this.imgcaturl.join('     ');
      this.vitem.catimgname = this.catlogimgname;
      //this.vitem.itemname = $('#itemname').val();
      debugger
      //var storedArray = JSON.parse('[' + sessionStorage.getItem("itemimgshape") + ']');

      this.fieldArray.forEach((data) => {
        if (!data.hasOwnProperty("aid")) {

            data["cat_img"] = this.vitem.cat_img;

            data["vendorid"] = this.vid;
         
            data["imgname"] = this.vitem.imgname;
           
            //if (data["itemname"] == undefined)
            //data["itemname"] = "";

          if (Number.isNaN(Number.parseInt(data["itm_id"])))
            data["itm_id"] = 0;
          if (Number.isNaN(Number.parseInt(data["PID"])))
            debugger
          data["PID"] = 0;
          if (Number.isNaN(Number.parseInt(data["prod_cat_id"])))
            debugger
          data["prod_cat_id"] = 0;
          //data["prod_subcat_id"] = this.vitem.prod_subcat_id;
          if (data["pscName"] == undefined)
            data["pscName"] = "";
          if (data["pcName"] == undefined)
            data["pcName"] = "";
          if (data["PName"] == undefined)
            data["PName"] = "";
          if (data["catlog_img"] == undefined)
            data["catlog_img"] = "";
          data["catimgname"] = this.vitem.catimgname;
            

         


          //this.imgcatval = this.imgcaturl.join(',');
          //console.log(this.imgcatval);
          //data["catlog_img"] = this.imgcatval;
           this.vitems.push(data);
          debugger


          //data["uid"] = Number.parseInt(sessionStorage.getItem("uid"));



        }
        
      })

      this.itemArray.forEach((data) => {

        if (!data.hasOwnProperty("aid")) {

          
            this.repimg = this.myimgurl[this.j];
            data["catimgname"] = this.catimgname[this.j];
            debugger
            this.repimg1 = (this.repimg.toString()).replace(/^data:image\/[a-z]+;base64,/, "");
            data["catlog_img"] = this.repimg1;
            this.j++;
            this.vitems.push(data);
          
          debugger
         
        }

      })
      console.log(this.vitems);
     
      this.entryService.vitemsadding(this.vitems)
        .subscribe((data: any) => {
          //M

          this.toaster.success(data["res"], "items added succesfully");
          this.closeBtn.nativeElement.click();
          this.vendoritems();
        },
        error => {
          if (error["status"] == 401) {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("uid");
            this.router.navigate(['/home']);
            debugger

            this.toaster.success('Sorry..ur Session time expire?please login');
            this.closeBtn.nativeElement.click();
          }
          else {
            this.toaster.success('Description Adding Failed');
          }
        })
    }
  }

  addFieldValue() {
    debugger
    let count = 5 - this.existingaddress.length;
    if (this.fieldArray.length < count) {

      this.fieldArray.push(this.newAttribute);
      debugger
      this.newAttribute = {};
      if (this.fieldArray.length == 0) {
        this.closebttn = false;

      }
      else {
        this.closebttn = true;
      }

    } else {

    }
  }

  additemValue() {
 
    
    let count = 5 - this.existingaddress.length;
    if (this.itemArray.length < count) {


      this.itemArray.push(this.newitemAttribute);
      debugger
      this.newitemAttribute = {};
      if (this.itemArray.length == 0) {
        this.closebttn = false;

      }
      else {
        this.closebttn = true;
      }
    } else {

    }
  }

  deleteitemValue(index) {
    this.itemArray.splice(index, 1);
    if (this.itemArray.length <= 0) {

      debugger
    }
  }

 
  


  vendoritems() {
    this.entryService.vendoritemsdata(this.vid).subscribe(data => {
      this.vendordata = data as string[];
      this.getproducts();
    })
  }

  getproducts() {
    this.entryService.getproducts().subscribe(
      data => {
        this.products = data as string[];


        //var p = $('#ddlpname').val();
        //this.productaccord(this.nrSelect);
        debugger
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);

      }
    );
  }
  productaccord(val: any) {

    this.entryService.getpcategories(val).subscribe(
      data => {
        this.prodcategories = data as string[];
        var x = $('#ddlcname').val('');
        this.prodsubcategories = [];
        //this.productcat(x);
        debugger
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);

      });

    console.log(this.prodsubcategories);
  }

  productcat(pcid: any) {

    this.prodsubcategories = null;
    this.entryService.getpscategories(pcid).subscribe(data => {

      this.prodsubcategories = data as string[];
      debugger
    }, (err: HttpErrorResponse) => {
      console.log(err);
    }
    );
  }


  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  productitems() {
    this.entryService.getvendoritems(this.vid).subscribe(
      data => {
        this.itms = data as string[];
        this.getproducts();
        debugger
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

 

 
  

 
 
  public imagePath;
   
  selectedFiles: any;

  preview(e) {
    this.showimgshape = false;
    if (e.length === 0)
      return;

    var mimeType = e[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = e;
    reader.readAsDataURL(e[0]);
    reader.onload = (_event) => {
      //this.imgURL = reader.result;
    }

    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
      this.catimgname.push(e.target.files[i].name);
      debugger

      console.log(this.myFiles);
    }
  }

 

 



}

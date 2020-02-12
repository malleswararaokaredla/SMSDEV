import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse , HttpHeaders } from '@angular/common/http';
import { Vendor } from '../models/Vendor';
import { map, retry } from 'rxjs/operators';
import{Response,RequestMethod,Headers,RequestOptions}from '@angular/http';
import { Vitem } from '../models/VitemModel';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  
  //readonly rootUrl = 'http://10.180.9.156:82';//'http://localhost/SMSFCart';//'https://localhost:44307';///api/User/Register';
  readonly rootUrl = 'https://localhost:44307';
  constructor(private http: HttpClient) { }
  fileToUpload: File;
  progress: number;
  message: string;
  
  registerVender( vendor : Vendor){
    const body : Vendor = {
      FirstName: vendor.FirstName,
      LastName:vendor.LastName,
      Email: vendor.Email,
      Password: vendor.Password,
      Gender: " ",
      PhoneNo: vendor.PhoneNo,
      ConfirmPassword:"" ,
      Logo:vendor.Logo,
      PID: vendor.PID,
     // VID:vendor.VID,
      Image:vendor.Image,
      //pName:vendor.pName,
      ISActive: 0 
    }  
        
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/api/Vendor/Register', body,{headers : reqHeader});

  }



  uploadimage(files) {
    if (files.length === 0)
      return;

    const formData: FormData = new FormData();

    for (let file of files)
      formData.append(file.name, file);
    debugger
    var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/Vendor/UploadFile', formData, { headers: reqHeader });
  }

  userAuthentication(Email, Password) {

   var data = "/" + Email +"/" + Password; 
   var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});

   return this.http.post(this.rootUrl + '/api/Entry/AVLogin'+ data +'',"", { headers: reqHeader });  
  }   
  
  getproducts(){   
    debugger
    return this.http.get(this.rootUrl + '/api/Vendor/getproduct', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    })
  }

  bindvendors() {
    debugger
    return this.http.get(this.rootUrl + '/api/Vendor/getvendors',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

  insproductvalues(pName){    
    var reqHeader=new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.rootUrl+'/api/Vendor/insproductname/'+pName+'','',{headers:reqHeader});
  }

  bindproduct(){   
    this.http.get(this.rootUrl+'/api/Vendor/getproduct') 
    .pipe(map((data:Response)=>{
      console.log(data);      
      var a={};
       a=data;     
      return data.json();
      
    }))
  }
 

  getpcategories(PID){
    debugger
    return this.http.get(this.rootUrl+'/api/Vendor/getpcategories/'+PID,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

  getcategories() {
    return this.http.get(this.rootUrl + '/api/Vendor/getcategories',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }


  getpscategories(prod_cat_id){
    return this.http.get(this.rootUrl+'/api/Vendor/getpscategories/'+prod_cat_id,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

  getpscategoriesbyvid(prod_cat_id, vid) {
    return this.http.get(this.rootUrl + '/api/Vendor/getpscategoriesbyvid/' + prod_cat_id + '/' + vid,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

   hideshow(event:any){
    event.preventDefault();
  
    var $this = $(this);
  
    if ($this.next().hasClass('show'))
     {    
        $this.next().removeClass('show');
        $this.next().slideUp(350);
    } 
    else {     
        $this.parent().parent().find('li .inner').removeClass('show');
        $this.parent().parent().find('li .inner').slideUp(350);
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
    }
  }

  insertvendorvalues(vid,x) {
    debugger
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem("token") });
   // var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.rootUrl + '/api/Vendor/insproudetials/'+vid+'/'+x+'','', { headers: reqHeader });
  }

  getvendoritems(vid) {    
    return this.http.get(this.rootUrl + '/api/Vendor/getvendoritemdetials/' + vid,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

  updateven_items(vid, vpid, pscid) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'bearer ' + sessionStorage.getItem("token") });
    return this.http.put(this.rootUrl + '/api/Vendor/updproddetials/' + vid + '/' + vpid + '/'+pscid+'', '', { headers: reqHeader });
  }

  vitemdeletion(vpid) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem("token") });
    return this.http.delete(this.rootUrl + '/api/Vendor/delvitem/' + vpid +'', { headers: reqHeader });
  }

 
   
  CheckEmail(Email)
  {           
    return this.http.post(this.rootUrl + '/api/Entry/CheckMail',JSON.stringify(Email), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    }) ;  
  }

  //1/10/2019
  insvenitems(vid, prod_subcat_id, itemimg, itemname) {
    debugger
    //    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'bearer ' + sessionStorage.getItem("token") });
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.rootUrl + '/api/Vendor/insvitemadd/' + vid + '/' + prod_subcat_id + '/'+ JSON.stringify(itemimg)+'/'+itemname+'', '', { headers: reqHeader });
  }


  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);
    debugger
    const uploadReq = new HttpRequest('POST', this.rootUrl +'/UploadFile', formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      debugger
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }


  vendoritemsdata(vid) {
    debugger
    return this.http.get(this.rootUrl + '/api/Vendor/getvenitems/' + vid,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
    
  }

  vitemnames(vid,pscid) {
    return this.http.get(this.rootUrl + '/api/Vendor/getvitemname/' + vid+'/'+pscid,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

  venitemsize() {
    return this.http.get(this.rootUrl + '/api/Vendor/getitemsize',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }
  venitemmattype() {
    return this.http.get(this.rootUrl + '/api/Vendor/getmaterialtype',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }
  venitemmatwork() {
    return this.http.get(this.rootUrl + '/api/Vendor/getmaterialworktype',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }
  venitembrand() {
    return this.http.get(this.rootUrl + '/api/Vendor/getbrands',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

  insvenitemdes(listdata) {    
   
    return this.http.post(this.rootUrl + '/api/Vendor/insitemsdesc',listdata, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

  vitemsadding(itemslist) {
  
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json',        
    'Authorization': 'bearer ' + sessionStorage.getItem("token") });
    return this.http.post(this.rootUrl + '/api/Vendor/insvitemadd/', itemslist, { headers: reqHeader });

  }
  venitemdescription(vid) {
    return this.http.get(this.rootUrl + '/api/Vendor/getdescitem/' + vid,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',        
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

}


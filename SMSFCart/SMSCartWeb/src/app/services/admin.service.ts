import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,} from '@angular/common/http';
//import {  BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Vendor } from '../models/Vendor';
import { Address } from '../models/AddressModel';
import { UserPersonalData } from '../models/UserPersonalData';
import { AddVendor } from '../models/AddVendor';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  selectedVendor: Vendor;
  selectedUser:UserPersonalData;
  selectedadr:Address;

  constructor(private http: HttpClient, private router: Router) {

  }


  readonly rootUrl = 'https://localhost:44307';
  //readonly rootUrl = 'http://10.180.9.156:82'

  GetVendorList(){    
    return this.http.get(this.rootUrl + '/api/Vendor/GetAllVendorsList', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    })   
  }

  GetUserList(){
    return this.http.get(this.rootUrl + '/api/User/GetAllUsersList', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    })   
  }
//Single Record
  DeleteVendor(vendorID) {    
    //IsActive False         
    return this.http.post(this.rootUrl + '/api/Admin/DeleteVenderByAdmin',  vendorID,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    }
    );  
  }

  CheckMailForExistVendor(Email)
  { 
    return this.http.get(this.rootUrl + '/api/Admin/CheckMailForExistVendor/'+ Email, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    })   ;  
  }


  AddorEditVenderByAdmin(vendor){       
    return this.http.post(this.rootUrl + '/api/Admin/AddorEditVenderByAdmin', vendor,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    }
  );
  } 

  GetAllVendorsByActiveStatus(IsActive:number){
      return this.http.get(this.rootUrl + '/api/Admin/GetAllVendorsByActiveStatus/' + IsActive , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + sessionStorage.getItem("token")
        })
      }   
   );
 }

 //Single/Multpul vendors Active/Deactive
 VendorStatusUpdate(vendorsList) { 
      return this.http.post(this.rootUrl + '/api/Admin/ChangeVenderStatusByAdmin', vendorsList , {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + sessionStorage.getItem("token")
        })
      }
  );     
}



GetProductslist(){    
  return this.http.get(this.rootUrl + '/api/Vendor/GetAllVendorsList', {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + sessionStorage.getItem("token")
    })
  })   
}


GetAllProductsByActiveStatus(IsActive:number){
    return this.http.get(this.rootUrl + '/api/Admin/GetAllProductsByActiveStatus/' + IsActive , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    }   
  );
  }

  CheckProductNameIsExist(pName)
  {  
    return this.http.get(this.rootUrl + '/api/Admin/CheckProductNameIsExist/'+ pName, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    })   ;  
  }

  AddorEditProductByAdmin(product){  
    console.log(product)     
    return this.http.post(this.rootUrl + '/api/Admin/AddorEditProductByAdmin', product,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    }
  );
  } 


  //Single Record
  DeleteProduct(PID) {    
    //IsActive False         
    return this.http.post(this.rootUrl + '/api/Admin/DeleteProductByAdmin', PID,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    }
    );  
  }


  GetAllCategoriesByActiveStatus(IsActive:number){
    return this.http.get(this.rootUrl + '/api/Admin/GeyAllProducts_CategoryByActiveStatus/' + IsActive , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    }   
  );
  }

  GetAllSubCategoriesByActiveStatus(IsActive:number){
    return this.http.get(this.rootUrl + '/api/Admin/GeyAllProducts_SubcategoryByActiveStatus/' + IsActive , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    }   
  );
  }

 
  GeyAllProducts_Category_SubcategoryList(){    
    return this.http.get(this.rootUrl + '/api/admin/GeyAllProducts_Category_SubcategoryList', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    })   
  }

  AddorEditCategoryByAdmin(product){     
    return this.http.post(this.rootUrl + '/api/Admin/AddorEditCategoryByAdmin', product,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    }
  );
  } 


  //Single Record
  DeleteCategory(PID) {    
    //IsActive False         
    return this.http.post(this.rootUrl + '/api/Admin/DeleteCategoryByAdmin', PID,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    }
    );  
  }

  GetAllCategories(){   
    return this.http.get(this.rootUrl + '/api/Admin/GetAllCategories', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    })   
  }

  AddorEditSubCategoryByAdmin(product){  
    console.log(product)     
    return this.http.post(this.rootUrl + '/api/Admin/AddorEditSubCategoryByAdmin', product,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    }
  );
  } 


  //Single Record
  DeleteSubCategory(PID) {    
    //IsActive False         
    return this.http.post(this.rootUrl + '/api/Admin/DeleteSubCategoryByAdmin', PID,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    }
    );  
  }

  GeyAllOrdersDetails(){
    return this.http.get(this.rootUrl + '/api/Admin/GeyAllOrdersDetails', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    }   
 );
}
}


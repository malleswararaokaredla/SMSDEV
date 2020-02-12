import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { RequestOptions, RequestMethod, Headers } from '@angular/http';
import { map, retry } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
//import { isNumber } from 'util';


export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
};

@Injectable({
  providedIn: 'root'
})
export class SmsfashionapiService {
  public appDrawer: any;
  public item_id: number;
  public currentUrl = new BehaviorSubject<string>(undefined);
  public UnknownUserBagData: Array<any> = [];
  public bagcount: number = 0;
  public bagcountarray: Array<any> = [];
  public bagiformationbyid: Array<any> = [];


  readonly rootUrl = 'https://localhost:44307';
   //readonly rootUrl = 'http://10.180.9.115:84';
 

  /*'http://www.smsfcart.com';*/
  constructor(private http: HttpClient, private router: Router) {

  }

  //sudha
  

  getValues() {
    return this.http.get( this.rootUrl + '/api/register/test' )//('https://localhost:44307/api/register/test')
  }

  AddUserapi(reg) {
   
    var body = reg;
    
    return this.http.post(this.rootUrl + '/api/Entry/Register',reg, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });

  }

  Loginapi(login) {
    var body = login;
   
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.rootUrl + '/api/Entry/login', login, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  Checkuseremailapi(data) {
    //checkuserEmail
  
    return this.http.post(this.rootUrl + '/api/Entry/CheckkMail', JSON.stringify(data), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });   
  }

  GetUsersDetailsById(id) {
    
    return this.http.get(this.rootUrl + '/api/User/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    })

    //return this.http.get('https://localhost:44307/api/User', {
    //  headers: new HttpHeaders({
    //    'Content-Type': 'application/json',
    //    'Authorization': 'bearer ' + sessionStorage.getItem("token")
    //  })
    //});
  }


  UpdateUserPersonaldata(data) {
    return this.http.post(this.rootUrl + '/api/User/Updateuserpersnldata', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")}) });
  }
  updatePassword(passwrdchng) {
  
    return this.http.post(this.rootUrl + '/api/User/updatepassword', passwrdchng, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }
  Uploadprofilephoto(Imagedata) {
    //UpdateProfilePhoto


    return this.http.post(this.rootUrl + '/api/User/UpdateProfilePhoto', Imagedata, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }


//address

  GetUserAddressDetailsById(id) {

    return this.http.get(this.rootUrl + '/api/Address/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    })
  }

  AddAddressApi(addrs) {
    return this.http.post(this.rootUrl + '/api/Address/AddAddressDetailsByid', addrs, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }


  //adding list of address

  ADDlListOfAddress(list) {
    //AddingAddressList

    return this.http.post(this.rootUrl + '/api/Address/AddingAddressList', list, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

  //UpdateAddressById
  UpdateAddressByIdApi(addrs) {
    return this.http.post(this.rootUrl + '/api/Address/UpdateAddressById', addrs, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

   //deleteAddressById
   DeleteAddrsDataById(addrs) {
    return this.http.post(this.rootUrl + '/api/Address/deleteAddressById', addrs, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

  //get items data

  //GetItemsdata(name) {
  //  //GetItemsData
  //  console.log(name);
  //  return this.http.get(this.rootUrl + '/api/Items/Getitemslist/'+ name, {
  //    headers: new HttpHeaders({
  //      'Content-Type': 'application/json'
      
  //    })
  //  });
  //}
  GetItemsdata(data) {
  
    return this.http.post(this.rootUrl + '/api/Items/Getitemslist', JSON.stringify(data), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  //get item details by id 
  GetItemDataByid() {

    return this.http.post(this.rootUrl + '/api/Items/GetItemDetailsbyid', JSON.stringify(this.item_id), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  GetItemsdataby_ids(list) {
 
    return this.http.post(this.rootUrl + '/api/Items/GetItemsDataby_IDS', list, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  //GetItemsBySearchNames
  GetItemDataBySearchname(name) {

    return this.http.post(this.rootUrl + '/api/Items/GetItemsBySearchNames', JSON.stringify(name), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }



  //adding items to bag

  AddingItemsToBag(item) {
    return this.http.post(this.rootUrl + '/api/Items/additemstobag', item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token") }) });
  
  }


  //get bag items by id
  GetBagItemsDetailsById(id) {
   
    return this.http.post(this.rootUrl + '/api/Items/GetBagItemsDetailsbyid', id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }


  //update bag details

  UpdateBagDetails(item) {
    return this.http.post(this.rootUrl + '/api/Items/Updatebagdetails', item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }




  //comm_movetowhishlist_removefrombag
  Comm_Service_Movetowhishlist_Remove(item) {

    return this.http.post(this.rootUrl + '/api/Items/comm_movetowhishlist_removefrombag', item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }


  //get wish list

  GetWishListdata(id) {
    
    return this.http.post(this.rootUrl + '/api/Items/Getwishlist', id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

  //get items size info

  GetItemSizeInfo(id) {
    //GetItemsizedatabyId
    return this.http.post(this.rootUrl + '/api/Items/GetItemsizedatabyId', id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

  //removeitemfromwhishlist
  RemoveItem_whishList(item) {
    
    return this.http.post(this.rootUrl + '/api/Items/removeitemfromwhishlist', item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }



  //save orders

  SaveOrders(order) {
    return this.http.post(this.rootUrl + '/api/Items/addoders', order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }

  Getoderesdata(id)
  {
    return this.http.post(this.rootUrl + '/api/Items/Getordersdata', id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + sessionStorage.getItem("token")
      })
    });
  }



  /*===================================================================================================================*/

  //GetProductsData



  getproducts() {

    return this.http.post(this.rootUrl + '/api/Items/GeProductsData', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
       
      })
    });
  }
  //GeProductscategoriesData
  getpcategories(id) {
    return this.http.post(this.rootUrl + '/api/Items/GeProductscategoriesData', JSON.stringify(id), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }


  getpscategories(prod_cat_id) {
    return this.http.get(this.rootUrl + '/api/Vendor/getpscategories/' + prod_cat_id);
  }


  //GetallProductsWithSubCat Data
  //GeAllProductsWithSUBcategoriesData


  GetallProductsWithSubCatdata(id) {
    return this.http.post(this.rootUrl + '/api/Items/GeAllProductsWithSUBcategoriesData', JSON.stringify(id), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
  

GetallProductsWithCatdata() {
  return this.http.post(this.rootUrl + '/api/Items/GeAllProductsWithcategoriesData', { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }


  Getallbrandsdata() {
    return this.http.post(this.rootUrl + '/api/Items/GetAllBrandsData', { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }
  
  Getbrandsdatabyname(name) {
    return this.http.post(this.rootUrl + '/api/Items/GetBrandsDatabyname', JSON.stringify(name), { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }



  GetFiltersData(item) {
    //FiltersItems

    return this.http.post(this.rootUrl + '/api/Items/FiltersItems', item, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }




  /*================================================================================================= */



  //GetMain Logo

  GetMainLogo() {
    return this.http.get(this.rootUrl + '/api/Entry/GetStorelogo', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        
      })
    })
  }


 /*============================================================================================================================================= */

  //services for images

  getapplog(): string {

    return "assets/MyImages/mainlogo3.jpg";
  }

  womencatgrytypeimags: Array<any> = [

    { img: 'assets/MyImages/kurti2.jpg', value:'Kurtas and Suits', name: 'kurtas', id: 101 },
    { img: 'assets/MyImages/krt2.jpeg', value: 'Kurtis and Tops', name: 'Tops', id: 102},
    { img: 'assets/MyImages/wsarees.jpg', value: 'Sarees', name: 'Sarees', id: 103 },
    { img: 'assets/MyImages/swtr.jpg', value: 'Sweaters', name: 'Winterware', id: 104 },
    { img: 'assets/MyImages/handbag.jpg', value: 'Hand Bags', name: 'Bags', id: 105 },
    { img: 'assets/MyImages/footware.jpg', value: 'Flats', name: 'Footware', id: 106 },
    { img: 'assets/MyImages/kids.jpg', value: 'Flats', name: 'Kids', id: 107 },
    { img: 'assets/MyImages/bangle.jpg', value: 'Kurtas and Suits', name: 'Accessories', id: 108},
    { img: 'assets/MyImages/kit.jpg', value: 'MakeUp', name: 'Beauty', id: 109 }
 
  ];

  mencatgrytypeimags: Array<any> = [

    { img: 'assets/MyImages/t-shirt.jpg', value: 'T-Shirts', name: 'T-Shirts', id: 101 },
    { img: 'assets/MyImages/shirts.jpg', value: 'Formal Shirts', name: 'Shirts', id: 102 },
    { img: 'assets/MyImages/mens-kurta.jpg', value: 'Kurtas', name: 'kurtas', id: 101 },
    { img: 'assets/MyImages/swtr.jpg', value: 'Sweaters', name: 'Winterware', id: 104 },
    { img: 'assets/MyImages/wallets.jpg', value: 'Bags', name: 'Bags', id: 105 },
    { img: 'assets/MyImages/menfootware.jpg', value: 'Flats', name: 'Footware', id: 106 },
    { img: 'assets/MyImages/menWatches.jpg', value: 'Flats', name: 'Watches', id: 107 },
    { img: 'assets/MyImages/kids.jpg', value: 'Flats', name: 'Kids', id: 107 },
  
    { img: 'assets/MyImages/accessories-for-men.jpg', value: 'Kurtas and Suits', name: 'Accessories', id: 108 },


    

  ];

  offers: Array<any>=[
    { img: 'assets/MyImages/offers/discount1.jpg', name: 'kurtas', id: 101 },
    { img: 'assets/MyImages/offers/discount2.jpg', name: 'Tops', id: 102 },
    { img: 'assets/MyImages/offers/dicount3.jpg', name: 'Sarees', id: 103 },
    { img: 'assets/MyImages/offers/dicount4.jpg', name: 'Winterware', id: 104 },
    { img: 'assets/MyImages/offers/discount5.jpg', name: 'Bags', id: 105 },
  
  ];

  brands: Array<any> = [

    { img: 'assets/MyImages/brands/b1.jpg', name: 'kurtas', id: 101 },
    { img: 'assets/MyImages/brands/b2.jpg', name: 'Tops', id: 102 },
    { img: 'assets/MyImages/brands/b3.jpg', name: 'kurtas', id: 101 },
    { img: 'assets/MyImages/brands/b4.jpg', name: 'biba', id: 102 },
    { img: 'assets/MyImages/brands/b5.jpg', name: 'kurtas', id: 101 },
    { img: 'assets/MyImages/brands/b6.jpg', name: 'Tops', id: 102 },
    { img: 'assets/MyImages/brands/b7.jpg', name: 'kurtas', id: 101 },
    { img: 'assets/MyImages/brands/b8.jpg', name: 'Biba', id: 102 },
    { img: 'assets/MyImages/brands/b9.jpg', name: 'kurtas', id: 101 },
    { img: 'assets/MyImages/brands/b10.jpg', name: 'Tops', id: 102 }, 
    { img: 'assets/MyImages/brands/b11.jpg', name: 'Tops', id: 102 },
    { img: 'assets/MyImages/brands/b12.jpg', name: 'kurtas', id: 101 }
   
  
  ];

  cartclients: Array<any> = [
    { img: 'assets/MyImages/cartclients/hdfc.jpg', name: 'kurtas', id: 101 },
    { img: 'assets/MyImages/cartclients/PhonePe.jpg', name: 'Tops', id: 102 },
    { img: 'assets/MyImages/cartclients/tez.jpg', name: 'Sarees', id: 103 },

  ]

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }



  navItems: NavItem[] = [
    {
      displayName: 'Account',
      iconName: 'recent_actors',
      route: 'usersettings',
      children: [
        {
          displayName: 'Profile',
          iconName: 'group',
          route: 'usersettings/editprofile'

        },
        {
          displayName: 'Orders',
          iconName: 'group',
          route: 'usersettings/orders',      
        },
        {
          displayName: 'WishList',
          iconName: 'group',
          route: 'whishlist'
        },
        {
          displayName: 'Logout',
          iconName: 'group',
          route: 'logout'
        }
      ]
    },
    {
      displayName: 'Mens',
      iconName: 'videocam',
      children: [
        {
          displayName: 'TopWare',
          iconName: 'group',
          children: [
            {
              displayName: 'T-Shirts',
              iconName: 'person',
              route: 'michael-prentice',            
            },
            {
              displayName: 'Casual Shirts',
              iconName: 'person',
              route: 'stephen-fluin',              
            },
            {
              displayName: 'Formal Shirts',
              iconName: 'person',
              route: 'mike-brocchi',              
            }
            ,
            {
              displayName: 'Jacktes',
              iconName: 'person',
              route: 'mike-brocchi',
            }
          ]
        },
        {
          displayName: 'Bottomware',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Jeans',
              iconName: 'star_rate',
              route: 'material-design'
            },            
          ]
        },
        {
          displayName: 'indian and festive ware footware',
          iconName: 'feedback',
          children: [
            {
              displayName: 'Kurtas',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'Sherwanis',
              iconName: 'star_rate',
              route: 'material-design'
            }
          ]
        },
        {
          displayName: 'footware',
          iconName: 'feedback',
          route: 'feedback'
        },
        {
          displayName: 'bags and backpacks',
          iconName: 'feedback',
          route: 'feedback'
        }
        ,
        {
          displayName: 'Accessories',
          iconName: 'feedback',
          route: 'feedback'
        }
      ]
    },
    {
      displayName: 'Womens',
      iconName: 'movie_filter',
      children: [
        {
          displayName: 'Indian & Fusion Wear',
          iconName: 'group',
          children: [
            {
              displayName: 'Kurtas and Suits',
              iconName: 'person',
              route: "kurtis/" +'Kurtas and Suits'+'/'+"''"+'/'+"''",
              
            },
            {
              displayName: 'Kurtis and Tops',
              iconName: 'person',
              route: "kurtis/" + 'Kurtis and Tops' + '/' + "''" + '/' + "''",
              
            },
            {
              displayName: 'Ethinic Dresses',
              iconName: 'person',
              route: 'mike-brocchi',
              
            },
            {
              displayName: 'Skirts',
              iconName: 'person',
              route: 'mike-brocchi',
            
            },
            {
              displayName: 'Sarees',
              iconName: 'person',
              route: 'mike-brocchi',
              
            },
            {
              displayName: 'DressMaterial',
              iconName: 'person',
              route: 'mike-brocchi',
             
            },
            {
              displayName: 'Duppatas and Shawls',
              iconName: 'person',
              route: 'mike-brocchi',
             
            }
          ]
        },
        {
          displayName: 'Womens Western Wear',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Dresses and Jumpsuits',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'Tops and T-shirts',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'Jeans',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Sweaters',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'bags',
          iconName: 'feedback',
          children: [
            {
              displayName: 'Hand Bags',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'Wallets',
              iconName: 'star_rate',
              route: 'what-up-web'
            }
          ]
        },
        {
          displayName: 'footware',
          iconName: 'feedback',
          children: [
            {
              displayName: 'Flats',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'Casual Shoes',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'Heels',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Boots',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            },
            {
              displayName: 'Sport Shoes',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'Beauty',
          iconName: 'feedback',
          children: [
            {
              displayName: 'MakeUp',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'SkinCare',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'Fragrances',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            }
          ]
        }
      ]
    },
    {
      displayName: 'Kids',
      disabled: true,
      iconName: 'report_problem',
      children: [
        {
          displayName: 'Indian & Fusion Wear',
          iconName: 'group',
          children: [
            {
              displayName: 'Michael Prentice',
              iconName: 'person',
              route: 'michael-prentice',
              children: [
                {
                  displayName: 'Create Enterprise UIs',
                  iconName: 'star_rate',
                  route: 'material-design'
                }
              ]
            },
            {
              displayName: 'Stephen Fluin',
              iconName: 'person',
              route: 'stephen-fluin',
              children: [
                {
                  displayName: 'What\'s up with the Web?',
                  iconName: 'star_rate',
                  route: 'what-up-web'
                }
              ]
            },
            {
              displayName: 'Mike Brocchi',
              iconName: 'person',
              route: 'mike-brocchi',
              children: [
                {
                  displayName: 'My ally, the CLI',
                  iconName: 'star_rate',
                  route: 'my-ally-cli'
                },
                {
                  displayName: 'Become an Angular Tailor',
                  iconName: 'star_rate',
                  route: 'become-angular-tailer'
                }
              ]
            }
          ]
        },
        {
          displayName: 'Western Wear',
          iconName: 'speaker_notes',
          children: [
            {
              displayName: 'Create Enterprise UIs',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'What\'s up with the Web?',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'My ally, the CLI',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Become an Angular Tailor',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'footware',
          iconName: 'feedback',
          route: 'feedback'
        }
      ]
    }
  ];


  GetBagCount() {


    if (sessionStorage.length > 1) {
  
      if (sessionStorage.getItem("uid")) {
  
        if (this.bagiformationbyid.length > 0) {
     
          if (localStorage.getItem("bagcount")) {
     
            return Number.parseInt((this.bagiformationbyid.length).toString()) + Number.parseInt(localStorage.getItem("bagcount"));
          }
          else {
        
            return Number.parseInt((this.bagiformationbyid.length).toString());
          }
        }
        else {
         
          if (localStorage.length > 0) {
          
            if (localStorage.getItem("bagcount")) {
    
              return Number.parseInt(localStorage.getItem("bagcount"));
            }
            else {
      
              return 0;
            }
          }
          else {
      
            return 0;
          }
        }
      }
    }
    else {
    
      if (localStorage.length > 0) {
     
        if (localStorage.getItem("bagcount")) {
  
          return Number.parseInt(localStorage.getItem("bagcount"));
        }
        else {
       
          return 0;
        }
      }
      else {
   
        return 0;
      }
    }


    //if (sessionStorage.getItem("uid")) {

    //  //  console.log(isNumber(this.bagiformationbyid.length));
    //  if (this.bagiformationbyid.length > 0) {
    //    console.log(">0");
    //    if (localStorage.getItem("bagcount")) {
    //      console.log("localStorage");
    //      return Number.parseInt((this.bagiformationbyid.length).toString()) + Number.parseInt(localStorage.getItem("bagcount"));
    //    }
    //    else {
    //      console.log("only bag lenght");
    //      return Number.parseInt((this.bagiformationbyid.length).toString());
    //    }
    //    // return Number.parseInt((this.bagiformationbyid.length).toString());
    //  }     
    //}

    //else if (localStorage.getItem("bagcount")) {
    //  console.log("only localStorage");
    //  return Number.parseInt(localStorage.getItem("bagcount"));
    //}

    //else {
    //  console.log("0");
    //  return 0;
    //}
  }


 

  CatNavigationUrls(id) {
    if (id == 101) {
      this.router.navigate(['/kurtis']);
    }
   
  }



}


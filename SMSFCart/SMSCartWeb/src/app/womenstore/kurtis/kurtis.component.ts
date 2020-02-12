import { Component, OnInit, ViewChild, ElementRef, VERSION, DebugElement } from '@angular/core';
import { SmsfashionapiService, NavItem } from '../../services/smsfashionapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from '../../login/login.component';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { PlatformLocation } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { forEach } from '@angular/router/src/utils/collection';
import { Items } from '../../models/ItemsModel';
import { FilterItems } from '../../models/FilterModel';
import { CommandName } from 'selenium-webdriver';
import { retry } from 'rxjs/operators';

const itemsdata: Array<any> = [];


@Component({
  selector: 'app-kurtis',
  templateUrl: './kurtis.component.html',
  styleUrls: ['./kurtis.component.scss']
})

export class KurtisComponent implements OnInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  version = VERSION;
  show: boolean = true;
  navItems: NavItem[];
  items: Array<any> = [];
  catcount: Number;

  applog: string;
  name: string;
  searchname: string;

  maxpriceval: number;
  minpriceval: number;

  searchdata: string = "";
  searchitems: Array<number> = [];


  copyitemsdata: Array<any> = [];

  mainlist: Array<any>=[];
  filterres: Array<any> = [];
  sortlist: boolean = true;
  brandfilterlist: Array<any> = [];
  pricefilterlist: Array<any> = [];
  categorieslist: Array<any> = [];


  sortlistdata: Array<any> = ["Low To High","High To Low"];
  subpid: number;
  allproductsinfo: Array<any> = [];

  brandsdata: Array<any> = [];
  pricefilter: Array<any> = [];
  checked = false;
  indeterminate = false;
  selectedbrands: Array<any> = [];

  categories: Array<any> = [];
  url: string;


  filtersitems: FilterItems = {
    bname: null,
    minprice: null,
    maxprice: null,
    prod_subcat_id: null,
    type: null,
    name:""
  }



  cagcount: number = 0;
  brandcount: number = 0;
  pricecount: number = 0;

  constructor(private dataservice: SmsfashionapiService, private router: Router, public dialog: MatDialog,
    private platformLocation: PlatformLocation, private toastr: ToastrService, route: ActivatedRoute) {

 
    //this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    //  this.router.navigate(['/kurtis', route.snapshot.params['name']]));



    //this.subpid = Number.parseInt(route.snapshot.params['id']);
    this.name = route.snapshot.params['name'];
    this.searchname = route.snapshot.params['searchname'];
    this.url = route.snapshot.params['url'];

 
    this.applog = this.dataservice.getapplog();

    //console.log(this.platformLocation.pathname);
    //if (this.subpid > 0) {
    //  console.log(this.subpid);
    //  console.log("id based");
    //  this.dataservice.GetItemsdata(this.subpid).subscribe(x => {
    //    console.log(x["res"]["table"]);
    //    this.items = x["res"]["table"];
    //  });
    //}
    //else


    //this.items = [
    //  { img:'assets/MyImages/Kurtis/kurtistypesicon.jpeg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/Kurtis/kurtistypesicon.jpeg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/Kurtis/kurtistypesicon.jpeg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/Kurtis/kurtistypesicon.jpeg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/Kurtis/kurtistypesicon.jpeg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/Kurtis/kurtistypesicon.jpeg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/Kurtis/kurtistypesicon.jpeg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/Kurtis/kurtistypesicon.jpeg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/Kurtis/kurtistypesicon.jpeg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/Kurtis/kurtistypesicon.jpeg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/Kurtis/kurtistypesicon.jpeg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/Kurtis/kurtistypesicon.jpeg', name: 'Blue Printed Kurta', price: 1200 },
    //  { img: 'assets/MyImages/Kurtis/kurtistypesicon.jpeg', name: 'Blue Printed Kurta', price: 1200 }
    //]
    this.navItems = this.dataservice.navItems;

    //if (sessionStorage.getItem("catcount")) {
    //  this.catcount = Number.parseInt(sessionStorage.getItem("catcount"));
    //}
    //else {
    //  this.catcount = 0;
    //}

    this.catcount = this.dataservice.GetBagCount();
    this.getallitemsdata();
  }


  getallitemsdata() {

    this.pricefilter = [];
    if (this.name != '' && this.name != 'abc') {

      this.allproductsinfo = JSON.parse(localStorage.getItem("productsinfo"));

      this.allproductsinfo.forEach((data) => {
        if ((data["pscname"]) == this.name) {

          this.dataservice.GetItemsdata(data["prod_subcat_id"]).subscribe(x => {

            this.items = x["res"]["table"];

            //this.copyitemsdata = x["res"]["table"];
            this.displaypriceList();
            this.Getbrandsdata();
          });
        }
      });
    }
    else if (this.searchname != '') {


      this.dataservice.GetItemDataBySearchname(this.searchname).subscribe(data => {

        this.items = data["res"]["table"];

        this.displaypriceList();

        this.Getbrandsdata();

      });

    }

    else if (this.url != '') {

   
      this.dataservice.Getbrandsdatabyname(this.url).subscribe(data => {
        this.items = data["res"]["table"];
        this.displaypriceList();

        this.Getbrandsdata();
      });
    }

    this.sortlist = true;
  }


  Getbrandsdata() {

    let list = Array.from(new Set(this.items.map((item: any) => item.brandname)));

    if (list.length > 2) {
      this.brandsdata = list;

      let catg = Array.from(new Set(this.items.map((item: any) => item.pscname)));

      if (catg.length >= 2) {
        this.categories = catg;
      }       
    }
    else {
      list = Array.from(new Set(this.items.map((item: any) => item.pscname)));
      this.categories = list;
    }

   // console.log(Array.from(new Set(this.items.map((item: any) => item.brandname))));
   
  }



  displaypriceList() {

    this.pricefilter = [];

  //  console.log(this.items.reduce((a, b) => Math.max(a, b)));

    this.maxpriceval = Math.max.apply(Math, this.items.map(function (o) { return o.price; }));
    this.minpriceval = Math.min.apply(Math, this.items.map(function (o) { return o.price; }));
   
    let midval = (this.minpriceval + this.maxpriceval) / 4;


    for (let i = this.minpriceval; i <= this.maxpriceval; i = i + midval + 1) {
      let pricerange = i + " to " + (Number.parseInt(i.toString()) + Number.parseInt(midval.toString()));
      this.pricefilter.push(pricerange);
    }

  }

  loadbranddata() {
    this.dataservice.Getallbrandsdata().subscribe(data => {
      this.brandsdata = data["res"]["table"];

    });
  }


  ngOnInit() {


  }
  ngAfterViewInit() {
    this.dataservice.appDrawer = this.appDrawer;
  }
  userprofile() {
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
  openorderspage() {
    if (sessionStorage.getItem("uid")) {
      this.router.navigateByUrl("/usersettings/orders");
    }
  }
  prifilepage() {

    if (sessionStorage.getItem("uid")) {
      this.router.navigateByUrl("/usersettings/editprofile");
    }
  }

  logout() {
    this.router.navigate(['/logout']);
  }

  displayitemdesc(id) {

    this.dataservice.item_id = Number.parseInt(id);

    let url: string = this.name;
    this.router.navigate(['/itemdesc', url]);
   
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

  FilterCagwise(e, index, data) {
    if (e.checked) {
     
      this.filterres.push(data);
      this.categorieslist.push(data);


      if ((this.brandfilterlist.length > 0) && (this.pricefilterlist.length > 0)) {
        this.FilterDataFromThreeCobinations();
      }

      else if ((this.brandfilterlist.length > 0) || (this.pricefilterlist.length > 0) ) {
    
        if (this.cagcount > 0) {

          this.filtersitems.bname = data;
          this.filtersitems.minprice = 0;
          this.filtersitems.maxprice = 0;
          this.filtersitems.type = 1;

         
          this.GetFilterDataUsingApi(this.filtersitems);
          this.cagcount = this.cagcount + 1;
         
        }
        else {
          if (this.brandfilterlist.length > 0) {
            this.items = this.copyitemsdata.filter(item => {

              for (let i = 0; i < this.categorieslist.length; i++) {

                if (item["pscname"] == this.categorieslist[i])
                  return true;
              }
              return false;
            });
          }
          else if (this.pricefilterlist.length > 0) {
            this.items = this.copyitemsdata.filter(item => {

              for (let i = 0; i < this.categorieslist.length; i++) {

                if (item["pscname"] == this.categorieslist[i])
                  return true;
              }
              return false;
            });
          }
      
        }
       

      }
      //else if (this.pricefilterlist.length > 0) {

      //  this.items = this.copyitemsdata.filter(item => {
          
      //    for (let i = 0; i < this.categorieslist.length; i++) {
    
      //      if (item["pscname"] == this.categorieslist[i])
      //        return true;

      //    }
      //    return false;

      //  })
      //}

      else {

        this.filtersitems.bname = data;
        this.filtersitems.minprice = 0;
        this.filtersitems.maxprice = 0;
        this.filtersitems.type = 1;

        this.GetFilterDataUsingApi(this.filtersitems);
        this.cagcount = this.cagcount + 1;
     
      }
    }

    else {

      this.categorieslist.splice(this.categorieslist.indexOf(data), 1);

      this.filterres.splice(this.filterres.indexOf(data, 1));

      if (this.categorieslist.length > 0) {
        this.items = this.items.filter(item => {

          if (item["pscname"] != data)
            return true;
        });
        return false;
      }
      else if (this.pricefilterlist.length > 0) {

        this.items = this.copyitemsdata.filter(item => {

          for (let key in this.pricefilterlist) {

            let pricearr = this.pricefilterlist[key].split(" ");

            if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
              return true;

          }
          return false;

        })

      }

      else if (this.brandfilterlist.length > 0)
      {
        this.items = this.copyitemsdata.filter(item => {


          for (let i = 0; i < this.brandfilterlist.length;i++) {


            if (item["brandname"] == this.brandfilterlist[i])
              return true;
          }
          return false;
        })
      }



      else {
        this.copyitemsdata = [];
        this.getallitemsdata();
      }
   
    }
  }


  getcheckboxvalue(e, index, data) {

    if (e.checked) {
      let checkedvalue = data;
   
      this.filterres.push(data);
      this.brandfilterlist.push(data);


      if ((this.categorieslist.length > 0) && (this.pricefilterlist.length > 0)) {

        this.FilterDataFromThreeCobinations();
      }


      else if ((this.categorieslist.length > 0) || (this.pricefilterlist.length > 0) ) {


        if (this.brandcount > 0) {
          this.filtersitems.bname = checkedvalue;
          this.filtersitems.minprice = 0;
          this.filtersitems.maxprice = 0;
          this.filtersitems.type = 1;
          this.GetFilterDataUsingApi(this.filtersitems);
          this.brandcount = this.brandcount + 1;
     
        }
        else {
          if (this.categorieslist.length > 0) {
            this.items = this.copyitemsdata.filter(item => {

              for (let i = 0; i < this.brandfilterlist.length; i++) {

                if (item["brandname"] == this.brandfilterlist[i])
                  return true;
              }
              return false;
            });
          }
          else if (this.pricefilterlist.length > 0) {
            this.items = this.copyitemsdata.filter(item => {

              for (let i = 0; i < this.brandfilterlist.length; i++) {

                if (item["brandname"] == this.brandfilterlist[i])
                  return true;
              }
              return false;
            });
          }
         
        }     
      }

     
      //else if (this.pricefilterlist.length > 0) {

      //  if (this.brandfilterlist.length > 1) {

      //    let filteritems = this.copyitemsdata.filter(item => {

      //      if ((item["brandname"] == checkedvalue) || (item["pscname"] == checkedvalue)) {
      //        return true;
      //      }

      //      return false;
      //    });
      //    filteritems.forEach(data => { this.items.push(data); })
      //  }
      //  else {
      //    this.items = this.copyitemsdata.filter(item => {

      //      if (item["brandname"] == checkedvalue || (item["pscname"] == checkedvalue)) {
      //        return true;
      //      }

      //      return false;
      //    });
      //  }
      //}


      else {
       
            this.filtersitems.bname = checkedvalue;
            this.filtersitems.minprice = 0;
            this.filtersitems.maxprice = 0;
            this.filtersitems.type = 1;

        this.GetFilterDataUsingApi(this.filtersitems);
        this.brandcount = this.brandcount + 1;
          }       
    }
    else {

      this.filterres.splice(this.filterres.indexOf(data), 1);

      this.brandfilterlist.splice(this.brandfilterlist.indexOf(data), 1);

      if (this.filterres.length > 0) {

        if (this.brandfilterlist.length > 0) {
          this.items = this.items.filter(item => {

            if (item["brandname"] != data)
              return true;
          });
          return false;
        }

        else if ((this.categorieslist.length > 0) && (this.pricefilterlist.length > 0)) {

          this.FilterDataFromThreeCobinations();

        }


        else if (this.pricefilterlist.length > 0) {


          if (this.brandfilterlist.length > 0) {
          
            this.items = this.copyitemsdata.filter(item => {

              for (let key in this.brandfilterlist) {

                if (item["brandname"] == this.brandfilterlist[key] || (item["pscname"] == this.brandfilterlist[key]))

                  return true;
              }
              return false;
            });
          }
          else {
            this.items = this.copyitemsdata.filter(item => {

              for (let key in this.pricefilterlist) {

                let pricearr = this.pricefilterlist[key].split(" ");
             
                if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
                  return true;

              }
              return false;

            })
          }

        }

        else if (this.categorieslist.length > 0) {

          this.items = this.copyitemsdata.filter(item => {

            for (let key in this.categorieslist) {

              if (item["pscname"] == this.categorieslist[key])
                return true;

            }
            return false;

          })

        }

        else {

            this.items = this.items.filter(item => {
            for (let key in this.filterres) {
            
              let pricearr = this.filterres[key].split(" ");

              if (pricearr.length > 1) {

                if (((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2])) || (item["pscname"] == this.filterres[key]))
                  return true;
              }
              else {
                if ((item["brandname"] == this.filterres[key]) || (item["pscname"] == this.filterres[key]))
                  return true;
              }
            }
            return false;
          });

          this.copyitemsdata = this.items;
        }
      }
      else {
        this.copyitemsdata = [];
        this.getallitemsdata();

      }

    }

  }


  //getcheckboxvalue(e, index) {

  //  if (e.checked) {

  //    console.log("abc");
  //    this.filterres.push(this.brandsdata[index]);

  //    this.brandfilterlist.push(this.brandsdata[index]);

  //    if (this.pricefilterlist.length > 0) {
      
  //      if (this.brandfilterlist.length > 1) {

  //        let filteritems = this.copyitemsdata.filter(item => {

  //          if (item["brandname"] == this.brandsdata[index]) {
  //            return true;
  //          }

  //          return false;
  //        });
  //        filteritems.forEach(data => { this.items.push(data); })
  //      }
  //      else {
         
  //        this.items = [];

  //        this.items = this.copyitemsdata.filter(item => {

  //          if (item["brandname"] == this.brandsdata[index]) {
  //            return true;
  //          }

  //          return false;
  //        });

  //      }
  //    }
  //    else {





     
  //      if (this.filtersitems.prod_subcat_id == null) {
  //        console.log("abcsl");
  //        this.items = [];

  //        let filteritemss = [];

  //        for (let i = 0; i < this.filterres.length; i++) {

  //          let test = this.copyitemsdata.filter(item => {

  //            if (item["brandname"] == this.filterres[i]) {
  //              return true;
  //            }

  //            return false;
  //          });

  //          test.forEach(data => { filteritemss.push(data) })

  //        }

  //        filteritemss.forEach(data => { this.items.push(data); })

  //      }
  //      else {
        
  //        this.dataservice.GetFiltersData(this.filtersitems).subscribe(data => {

  //          let res: Array<any> = [];
  //          res = data["res"]["table"];

  //          console.log(data);

  //          if (res.length > 0) {
  //            res.forEach(data => {
  //              this.copyitemsdata.push(data);
  //            });
  //            console.log(this.copyitemsdata);
  //            this.copyitemsdata = this.removeDuplicity(this.copyitemsdata);

  //          }
  //          if (this.copyitemsdata.length > 0) {
  //            this.items = this.copyitemsdata;

  //          }
  //        });
  //      }
  //    }

  //  }
  //  else {

  //    this.filterres.splice(this.filterres.indexOf(this.brandsdata[index]), 1);

  //    this.brandfilterlist.splice(this.filterres.indexOf(this.brandsdata[index]), 1);

  //    if (this.filterres.length > 0) {

  //      if (this.pricefilterlist.length > 0) {


  //        if (this.brandfilterlist.length > 0) {
    
  //          this.items = this.copyitemsdata.filter(item => {

  //            for (let key in this.brandfilterlist) {

  //              if (item["brandname"] == this.brandfilterlist[key])

  //                return true;

  //            }
  //            return false;
  //          });
  //        }
  //        else {
  //          this.items = this.copyitemsdata.filter(item => {

  //            for (let key in this.pricefilterlist) {

  //              let pricearr = this.pricefilterlist[key].split(" ");
           
  //              if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
  //                return true;

  //            }
  //            return false;

  //          })
  //        }

  //      }

  //      else {

  //        this.items = this.items.filter(item => {
  //          for (let key in this.filterres) {             
  //            let pricearr = this.filterres[key].split(" ");

  //            if (pricearr.length > 1) {
  //              if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
  //                return true;
  //            }
  //            else {
  //              if (item["brandname"] == this.filterres[key])
  //                return true;
  //            }
  //          }
  //          return false;
  //        });

     
  //      }    
  //    }
  //    else {

  //      this.copyitemsdata = [];
  //      this.getallitemsdata();
    
  //    }
     
  //  }

  //}

  //getPRICEcheckboxvalue(e, index) {

   

  //  let pricesting: string = this.pricefilter[index];
  //  let pricearr = pricesting.split(" ");
 
  //  if (e.checked) {

  //    this.filterres.push(this.pricefilter[index]);
  //    console.log(this.filterres);

  //    this.pricefilterlist.push(this.pricefilter[index]);

  //    console.log(this.pricefilterlist);

  //    if (this.brandfilterlist.length > 0) {

  //      if (this.pricefilterlist.length > 1) {

  //        console.log(this.pricefilterlist.length);

  //        let filteritems = this.copyitemsdata.filter(item => {
                   
  //            if (pricearr.length > 1) {
  //              if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
  //                return true;
  //            }

  //          return false;
  //        });
  //        filteritems.forEach(data => { this.items.push(data); })         
  //      }
  //      else {
  //        this.items = this.copyitemsdata.filter(item => {

  //          if (pricearr.length > 1) {
  //            if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
  //              return true;
  //          }
  //          return false;
  //        });
  //      }    
  //    }
  //    else {
  //      this.filtersitems.bname = "";
  //      this.filtersitems.minprice = Number.parseInt(pricearr[0]);
  //      this.filtersitems.maxprice = Number.parseInt(pricearr[2]);
  //      this.filtersitems.type = 2;

  //      this.allproductsinfo = JSON.parse(localStorage.getItem("productsinfo"));
  //      this.allproductsinfo.forEach((data) => {
  //        if ((data["pscname"]) == this.name) {
  //          this.filtersitems.prod_subcat_id = data["prod_subcat_id"];
  //        }
  //      });

  //      if (this.filtersitems.prod_subcat_id == null) {

  //        this.items = [];

  //        let filteritemss = [];
   
  //          for (let key in this.filterres) {
  //            let pricearr = this.filterres[key].split(" ");


  //            let data = this.copyitemsdata.filter(item => {
  //              if (pricearr.length > 1) {
  //                if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
  //                  return true;
  //              }
  //              else {
  //                if (item["brandname"] == this.filterres[key])
  //                  return true;
  //              }
  //            });

  //            data.forEach(item => { this.items.push(item); });
             
  //          }
  //          return false;

  //      }
  //      else {

  //        console.log(this.filtersitems);

  //        this.dataservice.GetFiltersData(this.filtersitems).subscribe(data => {

              
  //          let res: Array<any> = [];
  //          res = data["res"]["table"];
  //          if (res.length > 0) {

  //            res.forEach(data => {
  //              this.copyitemsdata.push(data);
  //            });
  //            console.log(this.copyitemsdata)
  //            this.copyitemsdata = this.removeDuplicity(this.copyitemsdata);
  //            console.log(this.copyitemsdata)
  //            if (this.copyitemsdata.length > 0) {

  //              this.items = this.copyitemsdata;

  //            }
  //          }
  //        });
  //      }

  //    }
  //  }
  //  else {
  //    this.filterres.splice(this.filterres.indexOf(this.pricefilter[index]), 1);
  //    this.pricefilterlist.splice(this.filterres.indexOf(this.pricefilter[index]), 1);

  //    if (this.filterres.length > 0) {

  
  //      if (this.brandfilterlist.length > 0) {


  //        if (this.pricefilterlist.length > 0) {
       
  //          this.items = this.copyitemsdata.filter(item => {

  //            for (let key in this.pricefilterlist) {
          
  //              let pricearr = this.pricefilterlist[key].split(" ");
         
  //              if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
  //                return true;

  //            }
  //            return false;
  //          });
  //        }
  //        else {
  //          this.items = this.copyitemsdata.filter(item => {

  //            for (let key in this.brandfilterlist) {             


  //              if (item["brandname"] == this.brandfilterlist[key])
  //                return true;

  //            }
  //            return false;

  //          })
  //        }
      
  //      }
  //      else {
  //        this.items = this.items.filter(item => {

  //          for (let key in this.filterres) {
           
  //            let pricearr = this.filterres[key].split(" ");
  //            if (pricearr.length > 1) {
              
  //              if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
  //                return true;
  //            }
  //            else {
  //              if (item["brandname"] == this.filterres[key])
  //                return true;
  //            }
  //          }
  //          return false;
  //        });
  //        this.copyitemsdata = this.items;
  //      }
    
  //    }
  //    else {
  //      this.copyitemsdata = [];
  //      this.getallitemsdata();
  //    }
  //  }
  //}


  getPRICEcheckboxvalue(e, index) {

    let pricesting: string = this.pricefilter[index];
    let pricearr = pricesting.split(" ");

    if (e.checked) {

      this.filterres.push(this.pricefilter[index]);

      this.pricefilterlist.push(this.pricefilter[index]);

      if ((this.brandfilterlist.length > 0) && (this.categorieslist.length > 0)) {

        this.FilterDataFromThreeCobinations();

      }


      else if ((this.categorieslist.length > 0) || (this.brandfilterlist.length > 0)) {
   
        if (this.pricecount > 0) {
          this.filtersitems.bname = "";
          this.filtersitems.minprice = Number.parseInt(pricearr[0]);
          this.filtersitems.maxprice = Number.parseInt(pricearr[2]);
          this.filtersitems.type = 2;

          this.GetFilterDataUsingApi(this.filtersitems);
          this.pricecount = this.pricecount + 1;
       
        }
        else {
          if (this.categorieslist.length > 0) {
            this.items = this.copyitemsdata.filter(item => {

              for (let key in this.pricefilterlist) {

                let pricearr = this.pricefilterlist[key].split(" ");

                if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
                  return true;

              }
              return false;

            });
          }
          else if (this.brandfilterlist.length > 0) {
            this.items = this.copyitemsdata.filter(item => {

              for (let key in this.pricefilterlist) {

                let pricearr = this.pricefilterlist[key].split(" ");

                if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
                  return true;
              }
              return false;

            });
          }

        }
      }


      //else if (this.brandfilterlist.length > 0) {

      //  if (this.pricefilterlist.length > 1) {

      //    let filteritems = this.copyitemsdata.filter(item => {

      //      if (pricearr.length > 1) {
      //        if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
      //          return true;
      //      }

      //      return false;
      //    });
      //    filteritems.forEach(data => { this.items.push(data); })
      //  }
      //  else {
      //    this.items = this.copyitemsdata.filter(item => {

      //      if (pricearr.length > 1) {
      //        if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
      //          return true;
      //      }
      //      return false;
      //    });
      //  }
      //}



      else {
    
        this.filtersitems.bname = "";
        this.filtersitems.minprice = Number.parseInt(pricearr[0]);
        this.filtersitems.maxprice = Number.parseInt(pricearr[2]);
        this.filtersitems.type = 2;
     
        this.GetFilterDataUsingApi(this.filtersitems);
        this.pricecount = this.pricecount + 1;
      }
    }
    else {
      this.filterres.splice(this.filterres.indexOf(this.pricefilter[index]), 1);
      this.pricefilterlist.splice(this.pricefilterlist.indexOf(this.pricefilter[index]), 1);

      if (this.filterres.length > 0) {
        
        if (this.pricefilterlist.length > 0) {

          this.items = this.items.filter(item => {
          
            for (let i = 0; i < this.pricefilterlist.length; i++) {
              let pricearr = this.pricefilterlist[i].split(" ");
              if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
                return true;
            }

            return false;
          });
        }

        else if ((this.brandfilterlist.length > 0) && (this.categorieslist.length > 0)) {

          this.FilterDataFromThreeCobinations();

        }

        else if (this.brandfilterlist.length > 0) {

          if (this.pricefilterlist.length > 0) {
    
            this.items = this.copyitemsdata.filter(item => {

              for (let key in this.pricefilterlist) {
        
                let pricearr = this.pricefilterlist[key].split(" ");
             
                if ((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2]))
                  return true;

              }
              return false;
            });
          }
          else {
            this.items = this.copyitemsdata.filter(item => {

              for (let key in this.brandfilterlist) {


                if ((item["brandname"] == this.brandfilterlist[key]) || (item["pscname"] == this.brandfilterlist[key]))
                  return true;

              }
              return false;

            })
          }

        }

        else if (this.categorieslist.length > 0) {

          this.items = this.copyitemsdata.filter(item => {

            for (let key in this.categorieslist) {

              if (item["pscname"] == this.categorieslist[key])
                return true;

            }
            return false;

          })

        }

        else {
          this.items = this.items.filter(item => {

            for (let key in this.filterres) {
          

              let pricearr = this.filterres[key].split(" ");
        
              if (pricearr.length > 1) {
           

                if (((item["price"] >= pricearr[0]) && (item["price"] <= pricearr[2])) || (item["pscname"] == this.filterres[key]))
                  return true;
              }
              else {
                if (item["brandname"] == this.filterres[key] || (item["pscname"] == this.filterres[key]))
                  return true;
              }
            }
            return false;
          });
          this.copyitemsdata = this.items;
        }

      }


      else {

        this.copyitemsdata = [];      
        this.getallitemsdata();
      }
    }
  }

 


  //getcheckboxvalue(e, data) {

  //  if (e.checked) {
  //    this.filterres.push(data)
  //    console.log(this.filterres);
  //    let filterdata = [];
  //    this.items = [];
  //    for (let i = 0; i < this.filterres.length; i++) {

  //      let value = this.filterres[i].split(" ");
  //      if (value.length > 1) {

  //        if (filterdata.length > 0) {
  //          filterdata = filterdata.filter(item => {
  //            if ((item["price"] >= value[0]) && (item["price"] <= value[2]))
  //              return true;
  //          })
  //        }
  //        else {
  //          filterdata = this.copyitemsdata.filter(item => {
  //            if ((item["price"] >= value[0]) && (item["price"] <= value[2]))
  //              return true;
  //          })
  //        }
  //      }
  //      else {

  //        if (filterdata.length > 0) {

  //          if (filterdata.some(e => e.brandname === data)) {

  //            filterdata = filterdata.filter(item => {

  //              if (item["brandname"] == this.filterres[i])
  //                return true;
  //            })
  //          }        
          
  //        }
  //        else {
  //          filterdata = this.copyitemsdata.filter(item => {

  //            if (item["brandname"] == this.filterres[i])
  //              return true;
  //          })
  //        }

        
  //      }
  //      filterdata.forEach(data => {
  //        this.items.push(data);
  //      })
  //    }

  //    console.log(filterdata);
  //    console.log(this.copyitemsdata);
  //    console.log(this.items);


  //  }
  //  else {
  //    this.filterres.splice(this.filterres.indexOf(data), 1);
  //  }

  //}



 removeDuplicity(datas) {
  return datas.filter((item, index, arr) => {
    const c = arr.map(item => item.itm_id);
    return index === c.indexOf(item.itm_id)
  })
  }


  opensortlist() {
    this.sortlist = false;
  }

  getvalue(index) {
    this.sortlist = true;
    if (this.sortlistdata[index] == "Low To High") {
      this.items.sort((val1, val2) => { return val1.price - val2.price });
     
    }
    else if (this.sortlistdata[index] == "High To Low") {
      this.items.sort((val1, val2) => { return val2.price - val1.price })
    }
    
  }


  //searching


  getsearchdata(name) {
    this.router.navigate(['/kurtis',"abc", name,'']);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };



  //  this.dataservice.GetItemDataBySearchname(name).subscribe(data => { console.log(data); });
    

    //this.searchitems = [];
    //console.log(name);
    //this.allproductsinfo.forEach((data) => {

    //  let val: string = data["pscname"];
    //  val = val.toLowerCase();
    //  let searchname: string = name;
    //  searchname = searchname.toLowerCase();


    //  if (val.indexOf(searchname) >= 0) {
    //    console.log(data["prod_subcat_id"]);

    //    this.searchitems.push(data["prod_subcat_id"]);

    //  }
    //});
   
    //  if (this.searchitems.length > 0) {

    //    this.dataservice.GetItemsdataby_ids(this.searchitems).subscribe(x => {
    //      console.log(x);

    //      this.items = x["res"]["table"];
    //      this.displaypriceList();
         
    //    });
    //}



  }


  //common funtion for filters combination of 3


  FilterDataFromThreeCobinations() {

      let result = [];

    if (this.brandfilterlist.length > 0) {
      if (result.length > 0) {
        result = result.filter(item => {
          for (let i = 0; i < this.brandfilterlist.length; i++) {

            if (item["brandname"] == this.brandfilterlist[i])
              return true;
          }
          return false;

        });
      }
      else {
        result = this.copyitemsdata.filter(item => {
          for (let i = 0; i < this.brandfilterlist.length; i++) {

            if (item["brandname"] == this.brandfilterlist[i])
              return true;
          }
          return false;

        });
      }
       
      }

    if (this.pricefilterlist.length > 0) {

      if (result.length > 0) {

        result = result.filter(item => {

          for (let i = 0; i < this.pricefilterlist.length; i++) {

            let val = this.pricefilterlist[i].split(" ");
            if ((item["price"] >= val[0]) && (item["price"] <= val[2]))
              return true;
          }
        });
      }
      else {

        result = this.copyitemsdata.filter(item => {

          for (let i = 0; i < this.pricefilterlist.length; i++) {

            let val = this.pricefilterlist[i].split(" ");
            if ((item["price"] >= val[0]) && (item["price"] <= val[2]))
              return true;
          }
        });

      }
      }

    if (this.categorieslist.length > 0) {

      if (result.length > 0) {
        result = result.filter(item => {

          for (let i = 0; i < this.categorieslist.length; i++) {
            if (item["pscname"] == this.categorieslist[i])
              return true;
          }
          return false;

        });
      }
      else {
        result = this.copyitemsdata.filter(item => {

          for (let i = 0; i < this.categorieslist.length; i++) {
            if (item["pscname"] == this.categorieslist[i])
              return true;
          }
          return false;

        });
      }

      }
      this.items = result;

    }
 
  //get filter data from database

  GetFilterDataUsingApi(data) {
    this.allproductsinfo = JSON.parse(localStorage.getItem("productsinfo"));
    this.allproductsinfo.forEach((dataa) => {
      if ((dataa["pscname"]) == this.name) {
        this.filtersitems.prod_subcat_id = dataa["prod_subcat_id"];
      }
    });

    if (this.filtersitems.prod_subcat_id == null) {
      this.filtersitems.prod_subcat_id = 0;

      if (this.searchname != '') {
        this.filtersitems.name = this.searchname;
      }
      else {
        this.filtersitems.name = this.url;
      }

    }
    let itemsres = [];
    this.dataservice.GetFiltersData(data).subscribe(data => {
      
          let res: Array<any> = [];
          res = data["res"]["table"];

          if (res.length > 0) {

            res.forEach(data => {
              this.copyitemsdata.push(data);
            });

            this.copyitemsdata = this.removeDuplicity(this.copyitemsdata);

          
            if (this.categorieslist.length > 0) {

              if (itemsres.length > 0) {
                itemsres = itemsres.filter(item => {
                  for (let i = 0; i < this.categorieslist.length; i++) {
                    if (item["pscname"] == this.categorieslist[i])
                      return true;
                  }
                  return false;
                })
              }
              else {
                itemsres = this.copyitemsdata.filter(item => {
                  for (let i = 0; i < this.categorieslist.length; i++) {
                    if (item["pscname"] == this.categorieslist[i])
                      return true;
                  }
                  return false;
                })
              }
               
              }

            
           
            if (this.brandfilterlist.length > 0) {
              if (itemsres.length > 0) {
                itemsres = itemsres.filter(item => {
                  for (let i = 0; i < this.brandfilterlist.length; i++) {
                    if (item["brandname"] == this.brandfilterlist[i])
                      return true;
                  }
                  return false;
                })
              }
              else {
                itemsres = this.copyitemsdata.filter(item => {
                  for (let i = 0; i < this.brandfilterlist.length; i++) {
                    if (item["brandname"] == this.brandfilterlist[i])
                      return true;
                  }
                  return false;
                })
              }

            
            }

            if (this.pricefilterlist.length > 0) {
              if (itemsres.length > 0) {

                itemsres = itemsres.filter(item => {

                  for (let i = 0; i < this.pricefilterlist.length; i++) {

                    let val = this.pricefilterlist[i].split(" ");
                    if ((item["price"] >= val[0]) && (item["price"] <= val[2]))
                      return true;
                  }
                });
              }

              else {
                itemsres= this.copyitemsdata.filter(item => {

                  for (let i = 0; i < this.pricefilterlist.length; i++) {

                    let val = this.pricefilterlist[i].split(" ");
                    if ((item["price"] >= val[0]) && (item["price"] <= val[2]))
                      return true;
                  }
                });
              }
            }

            this.items = itemsres;
            //if (this.copyitemsdata.length > 0) {

            //  this.items = this.copyitemsdata;
             
            //}
          }
        });
  }

}

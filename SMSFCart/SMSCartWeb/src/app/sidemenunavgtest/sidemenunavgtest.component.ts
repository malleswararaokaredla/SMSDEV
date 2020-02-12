import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidemenunavgtest',
  templateUrl: './sidemenunavgtest.component.html',
  styleUrls: ['./sidemenunavgtest.component.scss']
})
export class SidemenunavgtestComponent implements OnInit {

  name: string;

  allproductsinfo: Array<any> = [];

  constructor(route: ActivatedRoute,private router: Router) {

    this.name = route.snapshot.params['name'];
    this.allproductsinfo = JSON.parse(localStorage.getItem("productsinfo"));
    //console.log(this.allproductsinfo);
   // console.log(this.name);

    this.allproductsinfo.forEach((data) => {

      if ((data["pscname"]) == this.name) {
       // console.log(data["prod_subcat_id"]);

        this.router.navigate(['/kurtis', data["prod_subcat_id"]]);
        //        this.dataservice.CatNavigationUrls(data["prod_subcat_id"]);   
      }

    })
  }

  ngOnInit() {
  }

}

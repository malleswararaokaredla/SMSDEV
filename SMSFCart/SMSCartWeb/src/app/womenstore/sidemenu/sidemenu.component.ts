import { Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AppComponent } from '../../app.component';




@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})



export class SidemenuComponent implements OnDestroy {

 // content: string = "kurtis";
  //ngOnInit() {
  //}
  mobileQuery: MediaQueryList;
  dynmicpage: string = "<app-usersettings></app-usersettings>";
  fillerNav = Array.from({ length: 10 }, (_, i) => `Nav Item ${i + 1}`);





  fillerContent = Array.from({ length: 50 }, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private app: AppComponent) {

    if (sessionStorage.getItem("home")) {
      console.log("sidemenu");
      this.app.ngOnInit();
    }

    
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();

    //sessionStorage.setItem("sidemenu", this.sidemenu);
    this.mobileQuery.addListener(this._mobileQueryListener);
    //this.app.ngOnInit();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }




  ngOnInit() {
   
    }
   
  
  
 
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private router: Router) { }

  IsAVLoginedIn()
  {
    if (!sessionStorage.getItem("token"))
    {
      this.router.navigateByUrl('/vendor');
    }
  }
  
  IsULoginedIn()
  {
    if (!sessionStorage.getItem("token"))
    {
      this.router.navigateByUrl('/home');
    }    
  }

  AVLogout()
  {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("expiration");
    sessionStorage.removeItem('rid');
    sessionStorage.removeItem('UType');

    sessionStorage.clear(); //Added to clear local storage
    
    this.router.navigate(['/vendor']);
  }

  ULogout()
  {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userName");
  sessionStorage.removeItem("uid");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("expiration");
  this.router.navigate(['/home']);
  }

  getNoImage(): string {
    return "assets/no-image-available.png";
  }
}

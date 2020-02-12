import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { ValidatorService } from 'angular4-material-table';

@Injectable({
  providedIn: 'root'
})

export class VendorValidatorService implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      'uid': new FormControl(),
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      //'email': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      //'phoneNo': new FormControl(null,Validators.required ),
      'phoneNo': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      'password': new FormControl(),
      'gender': new FormControl(),
      });
  }
}
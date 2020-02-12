import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { ValidatorService } from 'angular4-material-table';

@Injectable({
  providedIn: 'root'
})
export class ProductValidatorService implements ValidatorService {
  getRowValidator(): FormGroup {
    return new FormGroup({
      'pid': new FormControl(),
      'pName': new FormControl(null, Validators.required),  
      'prod_cat_id': new FormControl(),
      'pcName': new FormControl(null, Validators.required), 
      'prod_subcat_id': new FormControl(), 
      'pscName': new FormControl(null, Validators.required),  
      });
  }
}
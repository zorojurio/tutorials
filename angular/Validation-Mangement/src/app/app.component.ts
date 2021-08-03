import { Component, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { ValidationService } from './validation.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userForm: any;

  constructor(private formBuilder: FormBuilder, private el: ElementRef) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, ValidationService.emailValidator]],
      profile: ['', [Validators.required, Validators.minLength(10)]]
    });

    console.log(this.userForm);
  }
  focustToFirstInvalid(formGroup: FormGroup): void {
    for (const key of Object.keys(formGroup.controls)) {
      if (formGroup.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector(
          '[formcontrolname="' + key + '"]'
        );
        invalidControl.focus();
        formGroup.controls[key].markAsTouched();
        break;
      }
    }
  }

  saveUser() {
    this.userForm.markAllAsTouched();
    this.focustToFirstInvalid(this.userForm);
    if (!this.userForm.valid) {
      return;
    }
  }

  validateFormControl(formControl: FormControl): boolean {
    if (formControl.hasError && formControl.touched) {
      return true;
    }
    return false;
  }
}

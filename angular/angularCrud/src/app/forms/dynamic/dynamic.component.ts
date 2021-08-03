import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {
  demoForm: FormGroup;
  dayItems: string[] =  ['sunday', 'mondy'];

  constructor(private formBuilder: FormBuilder) {
    this.demoForm = this.formBuilder.group({
      demoArray: this.formBuilder.array([])
    });
    this.dayItems = ['sunday', 'monday', 'tuesday', 'wednesday'];
  }

  ngOnInit(): void {
    for (const item in this.dayItems){
      this.demoArray.push(this.formBuilder.group({
        from: '',
        to: '',
      }));
    }
  }
  get demoArray(): FormArray {
    return this.demoForm?.get('demoArray') as FormArray;
  }

  onSubmit(): void{
    for (const item of this.demoForm.value.demoArray){
      console.log(item);

    }
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {
  @ViewChild('employeeForm') signUpForm: NgForm | undefined;
  gender = 'female';
  constructor() { }

  ngOnInit(): void {
  }

  createEmployee(form: NgForm): void{
    console.log(form.value);
    console.log(form);
  }

}

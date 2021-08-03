import { Component, OnInit } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[] = [
    {
      id: 1,
      name: 'Mark',
      gender: 'Male',
      email: 'mark@mark.com',
      contactPreferrence: 'Email',
      dateOfBirth: new Date('10/25/1998'),
      department: 'IT',
      isActive: true,
      photoPath: 'assets/img/mark.jpg'
    },
    {
      id: 2,
      name: 'Mary',
      gender: 'Female',
      email: 'mary@mary.com',
      phoneNumber: 222222222,
      contactPreferrence: 'Phone',
      dateOfBirth: new Date('10/15/1988'),
      department: 'HR',
      isActive: true,
      photoPath: 'assets/img/mary.jpg'
    },
    {
      id: 3,
      name: 'Saber',
      gender: 'Male',
      email: 'saber@mary.com',
      phoneNumber: 222222223,
      contactPreferrence: 'Phone',
      dateOfBirth: new Date('10/15/1978'),
      department: 'Finance',
      isActive: true,
      photoPath: 'assets/img/saber.jpg'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

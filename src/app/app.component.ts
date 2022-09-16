import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './models/employee';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public updateEmployee?: Employee;
  public deleteEmployee?: Employee;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (res) => (this.employees = res),
      error: (err) => alert(err.message),
    });
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.getEmployees();
        addForm.reset();
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe({
      next: (res) => {
        console.log(res);
        this.getEmployees();
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  public onDeleteEmployee(): void {
    if (this.deleteEmployee != null) {
      this.employeeService.deleteEmployee(this.deleteEmployee.id).subscribe({
        next: (res) => {
          console.log(res);
          this.getEmployees();
        },
        error: (err) => {
          alert(err.message);
        },
      });
    }
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (
        employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }
    if (results.length !== 0) {
      this.employees = results;
    }
    if (!key) {
      this.getEmployees();
    }
  }

  public onOpenModal(employee: any, mode: String): void {
    console.log('clicked');
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    }
    if (mode === 'update') {
      this.updateEmployee = employee;
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}

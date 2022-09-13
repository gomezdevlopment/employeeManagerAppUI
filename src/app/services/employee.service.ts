import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiServiceUri = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiServiceUri + '/employee/all');
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      this.apiServiceUri + '/employee/add',
      employee
    );
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      this.apiServiceUri + '/employee/update',
      employee
    );
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(
      this.apiServiceUri + '/employee/delete/' + employeeId
    );
  }
}

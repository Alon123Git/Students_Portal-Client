import { environment } from './../../environment/environment';
import { UpdateStudentRequest } from './../Models/APIModels/Update-student-request-model';
import { Student } from './../Models/APIModels/Student.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AddStudentRequest } from '../Models/add-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUri = environment.baseApiUri;

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUri + '/students');
  }

  getStudent(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUri + '/students/' + studentId);
  }

  updateStudent(studentId: string, studentRequest: Student): Observable<Student> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
      id: studentRequest.id
    }

    return this.httpClient.put<Student>(this.baseApiUri + '/students/' + studentId,
    updateStudentRequest);
  }

  deleteStudent(studentId: string): Observable<Student> {
    return this.httpClient.delete<Student>(this.baseApiUri + '/students/' + studentId);
  }

  addStudent(studentRequest: Student): Observable<Student> {
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
      id: studentRequest.id
    };

    return this.httpClient.post<Student>(this.baseApiUri + '/students/add',
     addStudentRequest);
  }

  uploadImage(studentId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("profileImage", file);
    return this.httpClient.post(this.baseApiUri + '/students/' + studentId + '/upload-image', 
    formData, {
      responseType: 'text'
    });

  }

  getImagePath(relativePath: string) {
    return `${this.baseApiUri}/${relativePath}`;
  }
}
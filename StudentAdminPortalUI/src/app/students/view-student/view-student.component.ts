import { UpdateStudentRequest } from './../../Models/APIModels/Update-student-request-model';
import { GenderService } from './../../Services/gender.service';
import { StudentService } from './../student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/UI Models/UiStudent.model';
import { Gender } from 'src/app/UI Models/UiGender.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { duration } from '@material-ui/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: '',
    genderId: '',
    profileImageUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }

  isNewStudent = false;
  header = '';
  displayProfileImageUrl = '';

  genderList: Gender[] = [];

  @ViewChild('studentDetailsForm') studentDetailsForm?: NgForm

  constructor(private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');

        if (this.studentId) {

          if (this.studentId.toLowerCase() === 'Add'.toLocaleLowerCase()) {
            // => New Student functionality
            this.isNewStudent = true;
            this.header = 'Add New Student';
            this.setImage();
          }
          else {
            // => Existing Student Functionally
            this.isNewStudent = false;
            this.header = 'Edit Student';
            this.studentService.getStudent(this.studentId)
              .subscribe(
                (successResponse) => {
                  this.student = successResponse;
                  this.setImage();
                },
                (errorResponse) => {
                  this.setImage();
                }
              );
          }

          this.genderService.getGenderList()
            .subscribe(
              (successResponse) => {
                this.genderList = successResponse;
              }
            )
        }
      }
    );
  }

  onUpdate(): void {
    if (this.studentDetailsForm?.form.valid) {
    this.studentService.updateStudent(this.student.id, this.student)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Student updated successfully', undefined, {
            duration: 2000
          });
        },
        (errorResponse) => {
          // Log it
          console.log(errorResponse);
        }
      );
    }
  }

  onDelete(): void {
    this.studentService.deleteStudent(this.student.id)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Student deleted successfully', undefined, {
            duration: 2000
          });

          setTimeout(() => {
            this.router.navigateByUrl('students');
          }, 2000);
        },
        (errorResponse) => {
          // Log
        }
      );
  }

  onAdd(): void {

    if (this.studentDetailsForm?.form.valid) {
      this.studentService.addStudent(this.student)
        .subscribe(
          (successResponse) => {
            this.snackbar.open('Student added successfully', undefined, {
              duration: 2000
            });
  
            setTimeout(() => {
              this.router.navigateByUrl(`students//${successResponse.id}`);
            }, 2000);
          },
          (errorResponse) => {
            // Log
            console.log(errorResponse);
          }
        );
    }

  }

  uploadImage(event: any): void {
    if (this.studentId) {
      const file: File = event.target.files[0];
      this.studentService.uploadImage(this.student.id, file)
      .subscribe(
        (successResponse) => {
          this.student.profileImageUrl = successResponse;
          this.setImage();

          this.snackbar.open('Profile Image Uploaded', undefined, {
            duration: 2000
          });
        },
        (errorResponse) => {

        }
      )
    }
  }

  private setImage(): void {
    if (this.student.profileImageUrl) {
      this.displayProfileImageUrl = this.studentService.getImagePath(
        this.student.profileImageUrl);
    }
    else {
      // Display a default
      this.displayProfileImageUrl = '/assets/user.png';
    }
  }
}
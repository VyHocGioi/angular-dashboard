import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Staff1 } from '../models/Staffs';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-insert-node',
  templateUrl: './insert-node.component.html',
  styleUrls: ['./insert-node.component.css'],
})
export class InsertNodeComponent implements OnInit {
  insertFrm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private staffsrv: StaffService) {
    this.insertFrm = this.fb.group({
      ID: ['', [Validators.required]],
      Name: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      Gender: ['', [Validators.required]],
      Position: ['', [Validators.required, Validators.minLength(5)]],
      Email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(8)],
      ],
      Phonenumber: [
        '',
        [Validators.required, Validators.pattern('[0-9][0-9]*')],
      ],
      Address: ['', [Validators.required]],
      Status: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    let item = new Staff1();
    // Lấy thông tin dữ liệu nhập trên form
    item.ID = this.insertFrm.controls['ID'].value;
    item.Name = this.insertFrm.controls['Name'].value;
    item.Gender = this.insertFrm.controls['Gender'].value;
    item.Position = this.insertFrm.controls['Position'].value;
    item.Email = this.insertFrm.controls['Email'].value;
    item.Phonenumber = this.insertFrm.controls['Phonenumber'].value;
    item.Address = this.insertFrm.controls['Address'].value;
    item.Status = this.insertFrm.controls['Status'].value;

    this.staffsrv.insertStaffs(item).subscribe((data) => console.log(data));
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Staff1 } from '../models/Staffs';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-staff-node',
  templateUrl: './staff-node.component.html',
  styleUrls: ['./staff-node.component.css'],
})
export class StaffNodeComponent implements OnInit {
  updateFrm: FormGroup = new FormGroup({});
  size: number = 0;
  idbtn: number = 0;
  staffs!: Staff1[];
  item!: Staff1;
  constructor(private staffsrv: StaffService, private fb: FormBuilder) {
    staffsrv.getStaffs().subscribe((data) => (this.staffs = data));
    this.updateFrm = this.fb.group({
      Name: ['', [Validators.required, Validators.maxLength(20)]],
      Gender: ['', [Validators.required]],
      Position: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Phonenumber: [
        '',
        [Validators.required, Validators.pattern('[0-9][0-9]*')],
      ],
      Address: ['', [Validators.required]],
      Status: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  getID(event: any) {
    this.idbtn = event.target.id;
    let itemobj = new Staff1();
    itemobj = this.staffs.filter((item) => item.ID == this.idbtn)[0];
    this.updateFrm.patchValue({
      Name: itemobj.Name,
      Gender: itemobj.Gender,
      Position: itemobj.Position,
      Email: itemobj.Email,
      Phonenumber: itemobj.Phonenumber,
      Address: itemobj.Address,
      Status: itemobj.Status,
    });
  }

  onUpdateSubmit() {
    this.item = {
      ID: this.idbtn,
      Name: this.updateFrm.controls['Name'].value,
      Gender: this.updateFrm.controls['Gender'].value,
      Position: this.updateFrm.controls['Position'].value,
      Email: this.updateFrm.controls['Email'].value,
      Phonenumber: this.updateFrm.controls['Phonenumber'].value,
      Address: this.updateFrm.controls['Address'].value,
      Status: this.updateFrm.controls['Status'].value,
    };
    // item.ID = this.idbtn;
    // item.Name = this.insertFrm.controls['Name'].value;
    // item.Gender = this.insertFrm.controls['Gender'].value;
    // item.Position = this.insertFrm.controls['Position'].value;
    // item.Email = this.insertFrm.controls['Email'].value;
    // item.Phonenumber = this.insertFrm.controls['Phonenumber'].value;
    // item.Address = this.insertFrm.controls['Address'].value;
    // item.Status = this.insertFrm.controls['Status'].value;

    this.staffsrv.updateStaffs(this.item).subscribe();
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Well done!',
    });
    let cleanUpdateForm = <HTMLFormElement>(
      document.getElementById('update-form')
    );
    cleanUpdateForm.reset();
    let closeUpdateForm = <HTMLElement>(
      document.getElementById('close-update-modal')
    );
    closeUpdateForm.click();
  }

  onDeleteSubmit(id: number) {
    Swal.fire({
      title: 'Do you want to delete the staff?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Staff had been deleted', '', 'success');
        this.staffsrv.deleteStaffs(id).subscribe();
      } else {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}

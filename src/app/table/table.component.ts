import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  Query,
} from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Staff1 } from '../models/Staffs';
import { StaffService } from '../services/staff.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Options } from '../models/Option';

// export interface Staff {
//   Address?: string;
//   Email?: string;
//   Gender?: string;
//   ID?: number;
//   Name?: string;
//   Phonenumber?: string;
//   Position?: string;
//   Status?: string;
// }
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  private staffsCollection: AngularFirestoreCollection<Staff1>;
  // staffs: Observable<Staff[]>;
  staffs: Staff1[] = [];
  allList: Staff1[] = [];
  config: any;
  insertFrm: FormGroup = new FormGroup({});
  updateFrm: FormGroup = new FormGroup({});
  page: number = 1;
  pageSize: number = 5;
  size: number = 0;
  idbtn: number = 0;
  staffFilter: Options[] = [
    { ID: 1, Name: 'Default' },
    { ID: 2, Name: 'Filter by status (Active)' },
    { ID: 3, Name: 'Filter by status (Inactive)' },
    { ID: 4, Name: 'Filter by Position (Developer)' },
    { ID: 5, Name: 'Filter by Position (Manager)' },
    { ID: 6, Name: 'Filter by Position (Leader)' },
  ];
  staff!: Staff1;
  checkExist!: Query<Staff1>;
  constructor(
    private readonly afs: AngularFirestore,
    private fb: FormBuilder,
    private staffsrv: StaffService
  ) {
    this.staffsCollection = afs.collection<Staff1>('Staff');
    // this.staffs = this.itemsCollection.valueChanges({ idField: 'key' });
    this.staffsCollection.valueChanges({ idField: 'key' }).subscribe((data) => {
      this.staffs = data.sort((a, b) => Number(a.ID) - Number(b.ID));
      // this.config = {
      //   itemsPerPage: 5,
      //   currentPage: 1,
      //   totalItems: this.staffs.length,
      // };
      this.size = this.staffs.length;
      this.allList = this.staffs;
    });

    this.insertFrm = this.fb.group({
      Name: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ],
      ],
      Gender: ['', [Validators.required]],
      Position: ['', [Validators.required]],
      Email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(8)],
      ],
      Phonenumber: [
        '',
        [Validators.required, Validators.pattern('[0-9][0-9]*')],
      ],
      Address: ['', [Validators.required, Validators.minLength(5)]],
      Status: ['', [Validators.required]],
    });

    this.updateFrm = this.fb.group({
      Name: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ],
      ],
      Gender: ['', [Validators.required]],
      Position: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.minLength(8)]],
      Phonenumber: [
        '',
        [Validators.required, Validators.pattern('[0-9][0-9]*')],
      ],
      Address: ['', [Validators.required, Validators.minLength(5)]],
      Status: ['', [Validators.required]],
    });
  }
  pageChanged(event: number) {
    this.config.currentPage = event;
  }

  ngOnInit(): void {}
  onAddSubmit() {
    let item = new Staff1();
    // Lấy thông tin dữ liệu nhập trên form
    item = {
      ID: this.size + 1,
      Name: this.insertFrm.controls['Name'].value,
      Gender: this.insertFrm.controls['Gender'].value,
      Position: this.insertFrm.controls['Position'].value,
      Email: this.insertFrm.controls['Email'].value,
      Phonenumber: this.insertFrm.controls['Phonenumber'].value,
      Address: this.insertFrm.controls['Address'].value,
      Status: this.insertFrm.controls['Status'].value,
    };
    // item.ID =
    // item.Name = this.insertFrm.controls['Name'].value;
    // item.Gender = this.insertFrm.controls['Gender'].value;
    // item.Position = this.insertFrm.controls['Position'].value;
    // item.Email = this.insertFrm.controls['Email'].value;
    // item.Phonenumber = this.insertFrm.controls['Phonenumber'].value;
    // item.Address = this.insertFrm.controls['Address'].value;
    // item.Status = this.insertFrm.controls['Status'].value;

    // this.staffsCollection?.doc(item.ID.toString()).set(Object.assign({}, item));
    this.checkExist = this.staffsCollection?.ref.where('Name', '==', item.Name);
    this.checkExist?.get().then((staffs) => {
      if (staffs.size > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Check the information and fill again',
        });
      } else {
        this.staffsCollection
          ?.doc(item.ID.toString())
          .set(Object.assign({}, item));
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Well done!',
        });
        let cleanAddForm = <HTMLFormElement>document.getElementById('add-form');
        cleanAddForm.reset();
        // this.insertFrm.patchValue({
        //   Gender: ''
        // });
        let closeAddForm = <HTMLElement>(
          document.getElementById('close-add-modal')
        );
        closeAddForm.click();
      }
    });
  }
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
    let item = new Staff1();

    item = {
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

    this.checkExist = this.staffsCollection?.ref.where('Name', '==', item.Name);
    this.checkExist?.get().then((staffs) => {
      if (staffs.size > 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: 'Check the information and fill again',
        });
      } else {
        this.staffsCollection?.doc(this.idbtn.toString()).update(item);
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
    });
  }
  // delete(
  //   docid: string,
  //   ID: number,
  //   Name: string,
  //   Address: string,
  //   Email: string,
  //   Gender: string,
  //   Phonenumber: string,
  //   Position: string,
  //   Status: string
  // ) {
  //   let st: Staff = {};
  //   st.ID = ID;
  //   st.Name = Name;
  //   st.Address = Address;
  //   st.Email = Email;
  //   st.Gender = Gender;
  //   st.Phonenumber = Phonenumber;
  //   st.Position = Position;
  //   st.Status = Status;

  //   this.staffsCollection.doc(docid).delete();
  // }
  onDeleteSubmit(event: any) {
    Swal.fire({
      title: 'Do you want to delete the staff?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Staff had been deleted', '', 'success');
        this.staffsCollection.doc(event.target.id.toString()).delete();
      } else {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  filter(event: any): void {
    switch (event.target.value) {
      case this.staffFilter[0].Name:
        this.staffs = this.allList;
        break;
      case this.staffFilter[1].Name:
        this.staffs = this.allList.filter(
          (staffs) => staffs.Status == 'Active'
        );
        break;
      case this.staffFilter[2].Name:
        this.staffs = this.allList.filter(
          (staffs) => staffs.Status == 'Inactive'
        );
        break;
      case this.staffFilter[3].Name:
        this.staffs = this.allList.filter(
          (staffs) => staffs.Position == 'Developer'
        );
        break;
      case this.staffFilter[4].Name:
        this.staffs = this.allList.filter(
          (staffs) => staffs.Position == 'Manager'
        );
        break;
      case this.staffFilter[5].Name:
        this.staffs = this.allList.filter(
          (staffs) => staffs.Position == 'Leader'
        );
        break;
    }
  }

  // filterByStatus() {
  //   this.staffs = this.staffs.filter((staffs) => staffs.Status.length < 7);
  // }
  // filterByPosition() {
  //   this.staffs = this.allList;
  // }

  searchStaff() {
    var textSearch = (<HTMLInputElement>document.getElementById('searchInput'))
      .value;
    var filter = <HTMLSelectElement>document.getElementById('filter');
    var value = filter.options[filter.selectedIndex].value;
    if (textSearch !== '') {
      if (value === this.staffFilter[0].Name) {
        this.staffs = this.allList.filter(
          (staff) =>
            staff.Name.toLowerCase().includes(textSearch.toLowerCase()) ||
            staff.Position.toLowerCase().includes(textSearch.toLowerCase()) ||
            staff.Address.toLowerCase().includes(textSearch.toLowerCase()) ||
            staff.Email.toLowerCase().includes(textSearch.toLowerCase())
        );
      }
      this.staffs = this.staffs.filter(
        (staff) =>
          staff.Name.toLowerCase().includes(textSearch.toLowerCase()) ||
          staff.Position.toLowerCase().includes(textSearch.toLowerCase()) ||
          staff.Address.toLowerCase().includes(textSearch.toLowerCase()) ||
          staff.Email.toLowerCase().includes(textSearch.toLowerCase())
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  openHome() {
    location.href = 'admin/home';
  }
  openInsertForm() {
    location.href = 'admin/insertnode';
  }
  openNode() {
    location.href = 'admin/test';
  }

  openRegister() {
    location.href = 'admin/register';
  }
}

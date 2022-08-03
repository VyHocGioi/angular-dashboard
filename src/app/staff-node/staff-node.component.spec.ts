import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffNodeComponent } from './staff-node.component';

describe('StaffNodeComponent', () => {
  let component: StaffNodeComponent;
  let fixture: ComponentFixture<StaffNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

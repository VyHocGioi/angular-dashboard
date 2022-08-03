import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertNodeComponent } from './insert-node.component';

describe('InsertNodeComponent', () => {
  let component: InsertNodeComponent;
  let fixture: ComponentFixture<InsertNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

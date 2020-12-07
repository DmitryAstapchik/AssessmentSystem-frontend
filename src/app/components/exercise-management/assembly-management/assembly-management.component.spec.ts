import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssemblyManagementComponent } from './assembly-management.component';

describe('AssemblyInfoComponent', () => {
  let component: AssemblyManagementComponent;
  let fixture: ComponentFixture<AssemblyManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssemblyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssemblyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { TestAssemblyInfo } from '../../../models/exercise-executor/test-assembly-info';
import { AssemblyInfoService } from '../../../services/exercise-executor/assembly-info.service';
import { AuthService } from '../../../services/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assembly-management',
  templateUrl: './assembly-management.component.html',
  styleUrls: ['./assembly-management.component.css']
})
export class AssemblyManagementComponent implements OnInit {
  public assemblyInfo: TestAssemblyInfo[] = new Array<TestAssemblyInfo>();
  uploadFile: any;
  file: File;
  fileName: string = 'Choose file...';
  uploading = false;

  constructor(private assemblyInfoService: AssemblyInfoService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (!this.authService.checkAccess(AssemblyManagementComponent.name)) {
      this.router.navigate(['denied']);
    }
    this.getAssembly();
  }

  getAssembly(): void {
    this.assemblyInfoService.getAll()
      .subscribe(info => this.assemblyInfo = info);
  }

  deleteAssembly(id: number): void {
    if (confirm('Are you sure want to delete?')) {
      this.assemblyInfo = this.assemblyInfo.filter(ai => ai.item2 !== id);
      this.assemblyInfoService.delete(id).subscribe();
    }
  }

  postAssembly(): void {
    if (this.file) {
      if (!this.assemblyInfo.some(ai => ai.item1 === this.file.name)) {
        const assembly = new TestAssemblyInfo();
        this.uploading = true;
        this.assemblyInfoService.сreateAssembly(this.file)
          .subscribe(
            id => {
              assembly.item2 = id.id;
              assembly.item1 = this.file.name;
              this.assemblyInfo.push(assembly);
            },
            err => {
              alert('Assembly already exists.');
            },
            () => {
              this.uploading = false;
              this.fileName = 'Choose file...';
            });
      } else {
        alert('Assembly with such name already exists.');
      }
    }
  }

  onChange(event) {
    const files: FileList = event.target.files;
    const type = files[0].name.split('.');
    if (type[type.length - 1] !== 'dll') {
      alert('Type of file must be .dll');
      event.target.value = null;
    } else {
      this.file = files[0];
      this.fileName = files[0].name;
    }
  }
}

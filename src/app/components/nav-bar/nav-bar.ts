import { Component, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { AddEmployeeModal } from '../add-employee-modal/add-employee-modal';

@Component({
  imports: [NzTypographyModule, NzButtonModule, AddEmployeeModal],
  selector: 'app-nav-bar',
  styleUrl: './nav-bar.scss',
  templateUrl: './nav-bar.html',
})
export class NavBar {
  isModalVisible = signal(false);

  showModal() {
    console.log('showModal');
    
    this.isModalVisible.set(true);
  }
}

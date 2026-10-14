import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule, NzInputSearchEvent } from 'ng-zorro-antd/input';

@Component({
  imports: [FormsModule, NzInputModule, NzIconModule],
  selector: 'app-employee-filter',
  styleUrl: './employee-filter.scss',
  templateUrl: './employee-filter.html',
})
export class EmployeeFilter {
  searchValue = model('');

  onSearch(event: NzInputSearchEvent): void {
    console.log(event);
    
    this.searchValue.set(event.value);
  }
}

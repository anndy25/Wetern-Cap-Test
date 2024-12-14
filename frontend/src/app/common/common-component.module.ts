import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCardComponent } from './filter-card/filter-card.component';
import { InputComponent } from './input/input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import this
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [FilterCardComponent, InputComponent, FilterMenuComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
  ],
  providers: [InputComponent],
  exports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTimepickerModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    InputComponent,
    FilterMenuComponent,
    FilterCardComponent,
    MatCheckboxModule,
  ],
})
export class CommonComponentsModule {}

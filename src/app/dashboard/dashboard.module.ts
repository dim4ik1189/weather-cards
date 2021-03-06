import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth-guard.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AddLocationFormComponent } from './add-location-form/add-location-form.component';
import { LocationsComponent } from './locations/locations.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TempPipePipe } from './pipes/temp-pipe.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    FooterComponent,
    AddLocationFormComponent,
    LocationsComponent,
    TempPipePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        canActivate: [ AuthGuard ],
        children: [
          {
            path: '',
            redirectTo: 'locations',
            pathMatch: 'full'
          },
          {
            path: 'locations',
            component: LocationsComponent,
          },
          {
            path: 'locations/add',
            component: AddLocationFormComponent
          },
        ]
      }
    ]),
    ReactiveFormsModule
  ]
})
export class DashboardModule { }

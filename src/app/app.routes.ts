import { Routes } from '@angular/router';

import { AppMainContent } from './layout/app-main-content/app-main-content.component';
import { AppHome } from './modules/app-home/app-home.component';
import { AppUsers } from './modules/app-users/app-users.component';
import { AppSpinner } from './basics/app-spinner/app-spinner.component';
import { AppTable } from './basics/app-table/app-table.component';

export const routes: Routes = [
  {
    path: '',
    component: AppMainContent,
    children: [
      {
        path: '',
        title: 'Home',
        component: AppHome,
      },
      {
        path: 'spinner',
        title: 'Spinner',
        component: AppSpinner,
      },
      {
        path: 'users',
        title: 'Users',
        component: AppUsers,
      }
    ]
  }
];

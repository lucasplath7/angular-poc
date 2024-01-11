import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppBanner } from './layout/app-banner/app-banner.component';
import { AppFooter } from './layout/app-footer/app-footer.component';
import { AppNav } from './layout/app-nav/app-nav.component';
import { AppMainContent } from './layout/app-main-content/app-main-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppBanner,
    AppFooter,
    AppMainContent,
    AppNav,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-poc';
}

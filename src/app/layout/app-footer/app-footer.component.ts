import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './app-footer.component.html',
  styleUrl: './app-footer.component.css'
})
export class AppFooter {
  author = 'Lucas Plath';
  contactEmail = 'lucas.plath@gmail.com';
}
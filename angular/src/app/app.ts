import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from './components';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
})
export class App {}
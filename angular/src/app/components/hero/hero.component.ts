import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardPost } from '../../models';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  @Input({ required: true}) heroData!: CardPost
}
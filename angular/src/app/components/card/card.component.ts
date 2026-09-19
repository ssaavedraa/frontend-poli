import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardPost } from '../../models';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true}) post!: CardPost
}
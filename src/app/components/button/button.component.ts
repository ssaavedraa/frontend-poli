import { booleanAttribute, Component, Input } from '@angular/core'

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'danger' | 'accent' = 'primary'
  @Input() type: 'button' | 'submit' | 'reset' = 'button'
  @Input({ transform: booleanAttribute }) disabled = false
}

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { ButtonComponent } from '../button/button.component'

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  @Input() message = ''
  @Output() confirm = new EventEmitter<void>()
  @Output() cancelled = new EventEmitter<void>()
  @ViewChild('appDialog') dialogRef: ElementRef<HTMLDialogElement> | undefined = undefined

  openDialog(): void {
    if (!this.dialogRef) {
      console.warn('Dialog reference not found')
      return
    }

    this.dialogRef.nativeElement.showModal()
  }

  closeDialog(): void {
    if (!this.dialogRef) {
      console.warn('Dialog reference not found')
      return
    }

    this.dialogRef.nativeElement.close()
  }
}

import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core'

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  @Input() message: string = ''
  @Output() confirm = new EventEmitter<void>()
  @Output() cancel = new EventEmitter<void>()
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

import { AbstractControl } from '@angular/forms'

export function getControlErrorMessage(control: AbstractControl | null | undefined): string | null {
  if (!control?.errors || !(control.touched || control.dirty)) {
    return null
  }

  const { errors } = control

  if (errors['required']) {
    return 'Este campo es obligatorio'
  }

  if (errors['email']) {
    return 'Introduce un correo electrónico válido'
  }

  if (errors['minlength']) {
    return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres`
  }

  if (errors['maxlength']) {
    return `No puede superar ${errors['maxlength'].requiredLength} caracteres`
  }

  if (errors['pattern']) {
    return 'Introduce una URL válida que empiece por http:// o https://'
  }

  return 'Campo inválido'
}

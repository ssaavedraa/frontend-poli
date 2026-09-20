import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components';
import { LocalStorageService } from '../../services';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.css'],
})
export class ContactPage {
  private readonly localStorageService = inject(LocalStorageService)
  showSuccessMessage = signal(false)
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]),
  })

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return
    }

    this.localStorageService.set('contact', this.contactForm.value)

    this.contactForm.reset()

    this.showSuccessMessage.set(true)

    setTimeout(() => {
      this.showSuccessMessage.set(false)
    }, 3000)
  }
}
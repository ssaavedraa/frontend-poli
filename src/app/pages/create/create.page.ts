import { Component, inject } from '@angular/core'
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ButtonComponent } from '../../components'
import { getLatestSlugIndex, slugify } from '../../domain'
import { CreatePostData } from '../../models'
import { PostsService } from '../../services'
import { getControlErrorMessage } from '../utils'

@Component({
  selector: 'app-create-page',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.css'],
})
export class CreatePage {
  private readonly postsService = inject(PostsService)
  private readonly router = inject(Router)
  protected readonly getControlErrorMessage = getControlErrorMessage

  createPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl('', [Validators.required]),
    summary: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(220),
    ]),
    imageSrc: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/\S+$/i)]),
    imageAlt: new FormControl('', [Validators.required]),
    content: new FormArray<FormControl<string>>([
      new FormControl('', [Validators.required]) as FormControl<string>,
    ]),
  })

  onSubmit(): void {
    this.createPostForm.markAllAsTouched()

    if (this.createPostForm.invalid) {
      return
    }

    const slug = this.getSlug(this.createPostForm.value.title ?? '')

    const createFormPayload: CreatePostData = {
      title: this.createPostForm.value.title ?? '',
      slug,
      subtitle: this.createPostForm.value.subtitle ?? '',
      summary: this.createPostForm.value.summary ?? '',
      content: this.createPostForm.value.content ?? [],
      imageSrc: this.createPostForm.value.imageSrc ?? '',
      imageAlt: this.createPostForm.value.imageAlt ?? '',
    }

    this.postsService.create(createFormPayload)

    this.router.navigate([`/post/${slug}`])
  }

  private getSlug(title: string): string {
    const sluggifiedTitle = slugify(title)
    const posts = this.postsService.getAll()
    const slugIndex = getLatestSlugIndex(sluggifiedTitle, posts)

    return slugIndex > 0 ? `${sluggifiedTitle}-${slugIndex}` : sluggifiedTitle
  }

  addParagraph(): void {
    this.createPostForm.controls.content.push(
      new FormControl('', [Validators.required]) as FormControl<string>,
    )
  }

  removeParagraph(index: number): void {
    if (this.createPostForm.controls.content.length > 1) {
      this.createPostForm.controls.content.removeAt(index)
    }
  }
}
